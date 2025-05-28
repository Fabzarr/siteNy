import { Repository } from 'typeorm';
import { Reservation } from '../entities/reservation.entity';
export declare class TimeSlotsService {
    private readonly reservationRepository;
    private readonly weekdayHours;
    private readonly weekendHours;
    private readonly slotDuration;
    private readonly maxCapacity;
    constructor(reservationRepository: Repository<Reservation>);
    private isWeekend;
    private getOpeningHours;
    private getExistingReservations;
    private generateTimeSlots;
    getAvailableTimeSlots(date: string): Promise<{
        date: string;
        slots: Array<{
            time: string;
            available: boolean;
            remainingCapacity: number;
        }>;
    }>;
    isSlotAvailable(date: string, time: string, numberOfPeople: number): Promise<boolean>;
}
