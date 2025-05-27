import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Reservation } from './entities/reservation.entity';

@Injectable()
export class ReservationsService {
  constructor(
    @InjectRepository(Reservation)
    private readonly reservationRepository: Repository<Reservation>,
  ) {}

  async create(createReservationDto: Partial<Reservation>): Promise<Reservation> {
    const reservation = this.reservationRepository.create(createReservationDto);
    return this.reservationRepository.save(reservation);
  }

  async findAll(): Promise<Reservation[]> {
    return this.reservationRepository.find({
      order: {
        date: 'ASC',
        time: 'ASC',
      },
    });
  }

  async findOne(id: string): Promise<Reservation> {
    const reservation = await this.reservationRepository.findOne({
      where: { id },
    });
    if (!reservation) {
      throw new NotFoundException(`Réservation #${id} non trouvée`);
    }
    return reservation;
  }

  async update(
    id: string,
    updateReservationDto: Partial<Reservation>,
  ): Promise<Reservation> {
    const reservation = await this.findOne(id);
    Object.assign(reservation, updateReservationDto);
    return this.reservationRepository.save(reservation);
  }

  async remove(id: string): Promise<void> {
    const result = await this.reservationRepository.delete(id);
    if (result.affected === 0) {
      throw new NotFoundException(`Réservation #${id} non trouvée`);
    }
  }
} 