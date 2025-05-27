import { Entity, Column, PrimaryGeneratedColumn, CreateDateColumn, UpdateDateColumn } from 'typeorm';
import { TimeSlot } from '../dto/check-availability.dto';

@Entity()
export class Reservation {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  firstName: string;

  @Column()
  lastName: string;

  @Column()
  phoneNumber: string;

  @Column()
  email: string;

  @Column()
  numberOfPeople: number;

  @Column({ type: 'date' })
  date: string;

  @Column({ 
    type: 'enum',
    enum: TimeSlot
  })
  time: TimeSlot;

  @Column({ default: false })
  confirmed: boolean;

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;
} 