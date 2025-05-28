import { Repository } from 'typeorm';
import { Reservation } from './entities/reservation.entity';
export declare class ReservationsService {
    private readonly reservationRepository;
    constructor(reservationRepository: Repository<Reservation>);
    create(createReservationDto: Partial<Reservation>): Promise<Reservation>;
    findAll(): Promise<Reservation[]>;
    findOne(id: string): Promise<Reservation>;
    update(id: string, updateReservationDto: Partial<Reservation>): Promise<Reservation>;
    remove(id: string): Promise<void>;
}
