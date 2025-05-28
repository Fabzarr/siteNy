import { ReservationsService } from './reservations.service';
import { TimeSlotsService } from './services/time-slots.service';
import { Reservation } from './entities/reservation.entity';
import { CreateReservationDto } from './dto/create-reservation.dto';
export declare class ReservationsController {
    private readonly reservationsService;
    private readonly timeSlotsService;
    constructor(reservationsService: ReservationsService, timeSlotsService: TimeSlotsService);
    getAvailableSlots(date: string): Promise<{
        date: string;
        slots: Array<{
            time: string;
            available: boolean;
            remainingCapacity: number;
        }>;
    }>;
    checkAvailability(data: {
        date: string;
        time: string;
        numberOfPeople: number;
    }): Promise<{
        available: boolean;
    }>;
    create(createReservationDto: CreateReservationDto): Promise<Reservation>;
    findAll(): Promise<Reservation[]>;
    findOne(id: string): Promise<Reservation>;
    update(id: string, updateReservationDto: Partial<CreateReservationDto>): Promise<Reservation>;
    remove(id: string): Promise<void>;
}
