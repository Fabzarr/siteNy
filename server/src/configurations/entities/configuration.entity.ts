import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class Configuration {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ type: 'json' })
  openingHours: {
    [key: string]: {
      open: string;
      close: string;
      closed: boolean;
    };
  };

  @Column()
  maxCapacity: number;

  @Column({ default: 2 })
  minReservationTime: number;

  @Column({ default: 120 })
  maxReservationTime: number;

  @Column({ default: 15 })
  reservationInterval: number;

  @Column({ default: true })
  allowReservations: boolean;

  @Column({ type: 'text', nullable: true })
  specialAnnouncement: string;

  @Column({ type: 'json', nullable: true })
  holidays: Date[];
} 