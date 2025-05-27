import { IsString, IsNumber, IsDateString, IsNotEmpty, Min, Max, IsEnum, IsEmail } from 'class-validator';
import { TimeSlot } from './check-availability.dto';

export class ReservationFormDto {
  @IsString()
  @IsNotEmpty({ message: 'Le prénom est requis' })
  firstName: string;

  @IsString()
  @IsNotEmpty({ message: 'Le nom est requis' })
  lastName: string;

  @IsEmail({}, { message: 'Veuillez entrer une adresse email valide' })
  @IsNotEmpty({ message: 'L\'email est requis' })
  email: string;

  @IsString()
  @IsNotEmpty({ message: 'Le numéro de téléphone est requis' })
  phoneNumber: string;

  @IsNumber()
  @Min(1, { message: 'Le nombre de personnes doit être d\'au moins 1' })
  @Max(20, { message: 'Le nombre de personnes ne peut pas dépasser 20' })
  numberOfPeople: number;

  @IsDateString({}, { message: 'Veuillez sélectionner une date valide' })
  @IsNotEmpty({ message: 'La date est requise' })
  date: string;

  @IsEnum(TimeSlot, { message: 'Veuillez sélectionner un créneau horaire valide' })
  @IsNotEmpty({ message: 'L\'heure est requise' })
  time: TimeSlot;
} 