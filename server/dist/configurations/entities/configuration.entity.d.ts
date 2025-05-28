export declare class Configuration {
    id: string;
    openingHours: {
        [key: string]: {
            open: string;
            close: string;
            closed: boolean;
        };
    };
    maxCapacity: number;
    minReservationTime: number;
    maxReservationTime: number;
    reservationInterval: number;
    allowReservations: boolean;
    specialAnnouncement: string;
    holidays: Date[];
}
