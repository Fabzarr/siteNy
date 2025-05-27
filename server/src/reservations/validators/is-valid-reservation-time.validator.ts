import { ValidatorConstraint, ValidatorConstraintInterface, ValidationArguments } from 'class-validator';
import { Injectable } from '@nestjs/common';
import { TimeSlot } from '../dto/check-availability.dto';

@ValidatorConstraint({ name: 'isValidReservationTime', async: false })
@Injectable()
export class IsValidReservationTime implements ValidatorConstraintInterface {
    // Créneaux du dimanche au jeudi : 18h00 à 21h30
    private weekdaySlots = [
        TimeSlot.H1800, TimeSlot.H1815, TimeSlot.H1830, TimeSlot.H1845,
        TimeSlot.H1900, TimeSlot.H1915, TimeSlot.H1930, TimeSlot.H1945,
        TimeSlot.H2000, TimeSlot.H2015, TimeSlot.H2030, TimeSlot.H2045,
        TimeSlot.H2100, TimeSlot.H2115, TimeSlot.H2130
    ];

    // Créneaux vendredi, samedi et veilles de fêtes : 18h00 à 01h45
    private weekendSlots = [
        TimeSlot.H1800, TimeSlot.H1815, TimeSlot.H1830, TimeSlot.H1845,
        TimeSlot.H1900, TimeSlot.H1915, TimeSlot.H1930, TimeSlot.H1945,
        TimeSlot.H2000, TimeSlot.H2015, TimeSlot.H2030, TimeSlot.H2045,
        TimeSlot.H2100, TimeSlot.H2115, TimeSlot.H2130, TimeSlot.H2145,
        TimeSlot.H2200, TimeSlot.H2215, TimeSlot.H2230, TimeSlot.H2245,
        TimeSlot.H2300, TimeSlot.H2315, TimeSlot.H2330, TimeSlot.H2345,
        TimeSlot.H0000, TimeSlot.H0015, TimeSlot.H0030, TimeSlot.H0045,
        TimeSlot.H0100, TimeSlot.H0115, TimeSlot.H0130, TimeSlot.H0145
    ];

    private isHoliday(date: Date): boolean {
        const day = date.getDate();
        const month = date.getMonth() + 1;

        // Jours fériés fixes
        const fixedHolidays = [
            { day: 1, month: 1 },    // Nouvel an
            { day: 31, month: 12 },  // Saint-Sylvestre
            // Autres jours fériés à ajouter selon besoin
        ];

        return fixedHolidays.some(holiday => 
            holiday.day === day && holiday.month === month
        );
    }

    validate(time: TimeSlot, args: ValidationArguments) {
        const { date } = args.object as { date: string };
        const reservationDate = new Date(date);
        const dayOfWeek = reservationDate.getDay();
        
        // Vérifie si c'est un jour férié ou veille de jour férié
        if (this.isHoliday(reservationDate)) {
            return this.weekendSlots.includes(time);
        }

        // Weekend (vendredi = 5, samedi = 6)
        if (dayOfWeek === 5 || dayOfWeek === 6) {
            return this.weekendSlots.includes(time);
        }

        // Semaine (dimanche à jeudi)
        return this.weekdaySlots.includes(time);
    }

    defaultMessage(args: ValidationArguments) {
        const { date } = args.object as { date: string };
        const reservationDate = new Date(date);
        const dayOfWeek = reservationDate.getDay();
        
        if (dayOfWeek === 5 || dayOfWeek === 6 || this.isHoliday(reservationDate)) {
            return 'Les réservations sont possibles de 18h00 à 01h45 les vendredis, samedis et veilles de jours fériés';
        }
        return 'Les réservations sont possibles de 18h00 à 21h30 du dimanche au jeudi';
    }
} 