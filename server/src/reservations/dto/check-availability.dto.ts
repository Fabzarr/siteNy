import { IsString, IsNumber, IsDateString, IsNotEmpty, Min, Max, IsEnum, Validate } from 'class-validator';
import { IsValidReservationTime } from '../validators/is-valid-reservation-time.validator';

export enum TimeSlot {
  H1800 = '18:00',
  H1815 = '18:15',
  H1830 = '18:30',
  H1845 = '18:45',
  H1900 = '19:00',
  H1915 = '19:15',
  H1930 = '19:30',
  H1945 = '19:45',
  H2000 = '20:00',
  H2015 = '20:15',
  H2030 = '20:30',
  H2045 = '20:45',
  H2100 = '21:00',
  H2115 = '21:15',
  H2130 = '21:30',
  H2145 = '21:45',
  H2200 = '22:00',
  H2215 = '22:15',
  H2230 = '22:30',
  H2245 = '22:45',
  H2300 = '23:00',
  H2315 = '23:15',
  H2330 = '23:30',
  H2345 = '23:45',
  H0000 = '00:00',
  H0015 = '00:15',
  H0030 = '00:30',
  H0045 = '00:45',
  H0100 = '01:00',
  H0115 = '01:15',
  H0130 = '01:30',
  H0145 = '01:45'
}

export class CheckAvailabilityDto {
  @IsNumber()
  @Min(1)
  @Max(20)
  numberOfPeople: number;

  @IsDateString()
  @IsNotEmpty()
  date: string;

  @IsEnum(TimeSlot, {
    message: 'Veuillez choisir un créneau horaire valide'
  })
  @IsNotEmpty()
  @Validate(IsValidReservationTime, {
    message: 'Ce créneau horaire n\'est pas disponible pour le jour sélectionné'
  })
  time: TimeSlot;
} 