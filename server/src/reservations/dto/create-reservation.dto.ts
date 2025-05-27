import { IsString, IsNumber, IsDateString, IsNotEmpty, Min, Max, IsEnum } from 'class-validator';
import { TimeSlot } from './check-availability.dto';

export class CreateReservationDto {
  @IsString()
  @IsNotEmpty()
  firstName: string;

  @IsString()
  @IsNotEmpty()
  lastName: string;

  @IsString()
  @IsNotEmpty()
  phoneNumber: string;

  @IsString()
  @IsNotEmpty()
  email: string;

  @IsNumber()
  @Min(1)
  @Max(20)
  numberOfPeople: number;

  @IsDateString()
  @IsNotEmpty()
  date: string;

  @IsEnum(TimeSlot)
  @IsNotEmpty()
  time: TimeSlot;
} 