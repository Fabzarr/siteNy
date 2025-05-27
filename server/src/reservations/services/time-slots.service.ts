import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Reservation } from '../entities/reservation.entity';
import * as moment from 'moment';

interface OpeningHours {
  open: string;
  close: string;
}

@Injectable()
export class TimeSlotsService {
  private readonly weekdayHours: OpeningHours = {
    open: '11:00',
    close: '23:00',
  };

  private readonly weekendHours: OpeningHours = {
    open: '11:00',
    close: '02:00', // 2h du matin le lendemain
  };

  private readonly slotDuration = 15; // durée d'un créneau en minutes
  private readonly maxCapacity = 50; // capacité maximale du restaurant

  constructor(
    @InjectRepository(Reservation)
    private readonly reservationRepository: Repository<Reservation>,
  ) {}

  private isWeekend(date: Date): boolean {
    const day = date.getDay();
    return day === 5 || day === 6; // Vendredi = 5, Samedi = 6
  }

  private getOpeningHours(date: Date): OpeningHours {
    return this.isWeekend(date) ? this.weekendHours : this.weekdayHours;
  }

  private async getExistingReservations(date: string): Promise<Reservation[]> {
    return this.reservationRepository.find({
      where: { date },
      order: { time: 'ASC' },
    });
  }

  private generateTimeSlots(date: Date): string[] {
    const hours = this.getOpeningHours(date);
    const slots: string[] = [];
    let current = moment(hours.open, 'HH:mm');
    const closing = moment(hours.close, 'HH:mm');

    // Si c'est l'heure de fermeture du lendemain (ex: 2h du matin)
    if (closing.hour() < 12) {
      closing.add(1, 'day');
    }

    while (current.isBefore(closing)) {
      slots.push(current.format('HH:mm'));
      current.add(this.slotDuration, 'minutes');
    }

    return slots;
  }

  async getAvailableTimeSlots(date: string): Promise<{
    date: string;
    slots: Array<{
      time: string;
      available: boolean;
      remainingCapacity: number;
    }>;
  }> {
    const dateObj = new Date(date);
    const timeSlots = this.generateTimeSlots(dateObj);
    const existingReservations = await this.getExistingReservations(date);

    const slotsWithAvailability = timeSlots.map(time => {
      const reservationsAtTime = existingReservations.filter(
        res => res.time === time,
      );
      const occupiedSeats = reservationsAtTime.reduce(
        (sum, res) => sum + res.numberOfPeople,
        0,
      );
      const remainingCapacity = this.maxCapacity - occupiedSeats;

      return {
        time,
        available: remainingCapacity > 0,
        remainingCapacity: Math.max(0, remainingCapacity),
      };
    });

    return {
      date,
      slots: slotsWithAvailability,
    };
  }

  async isSlotAvailable(
    date: string,
    time: string,
    numberOfPeople: number,
  ): Promise<boolean> {
    const existingReservations = await this.getExistingReservations(date);
    const reservationsAtTime = existingReservations.filter(
      res => res.time === time,
    );
    const occupiedSeats = reservationsAtTime.reduce(
      (sum, res) => sum + res.numberOfPeople,
      0,
    );

    return occupiedSeats + numberOfPeople <= this.maxCapacity;
  }
} 