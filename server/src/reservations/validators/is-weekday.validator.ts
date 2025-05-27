import { ValidatorConstraint, ValidatorConstraintInterface, ValidationArguments } from 'class-validator';
import { Injectable } from '@nestjs/common';

@ValidatorConstraint({ name: 'isWeekday', async: false })
@Injectable()
export class IsWeekday implements ValidatorConstraintInterface {
    validate(date: string, args: ValidationArguments) {
        const reservationDate = new Date(date);
        const dayOfWeek = reservationDate.getDay();
        
        // 0 = Dimanche, 4 = Jeudi
        // Vérifie si le jour est entre dimanche (0) et jeudi (4)
        return dayOfWeek >= 0 && dayOfWeek <= 4;
    }

    defaultMessage(args: ValidationArguments) {
        return 'Les réservations sont possibles uniquement du dimanche au jeudi, hors jours fériés';
    }
} 