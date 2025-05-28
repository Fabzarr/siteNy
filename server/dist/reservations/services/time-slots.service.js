"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.TimeSlotsService = void 0;
const common_1 = require("@nestjs/common");
const typeorm_1 = require("@nestjs/typeorm");
const typeorm_2 = require("typeorm");
const reservation_entity_1 = require("../entities/reservation.entity");
const moment = require("moment");
let TimeSlotsService = class TimeSlotsService {
    constructor(reservationRepository) {
        this.reservationRepository = reservationRepository;
        this.weekdayHours = {
            open: '11:00',
            close: '23:00',
        };
        this.weekendHours = {
            open: '11:00',
            close: '02:00',
        };
        this.slotDuration = 15;
        this.maxCapacity = 50;
    }
    isWeekend(date) {
        const day = date.getDay();
        return day === 5 || day === 6;
    }
    getOpeningHours(date) {
        return this.isWeekend(date) ? this.weekendHours : this.weekdayHours;
    }
    async getExistingReservations(date) {
        return this.reservationRepository.find({
            where: { date },
            order: { time: 'ASC' },
        });
    }
    generateTimeSlots(date) {
        const hours = this.getOpeningHours(date);
        const slots = [];
        let current = moment(hours.open, 'HH:mm');
        const closing = moment(hours.close, 'HH:mm');
        if (closing.hour() < 12) {
            closing.add(1, 'day');
        }
        while (current.isBefore(closing)) {
            slots.push(current.format('HH:mm'));
            current.add(this.slotDuration, 'minutes');
        }
        return slots;
    }
    async getAvailableTimeSlots(date) {
        const dateObj = new Date(date);
        const timeSlots = this.generateTimeSlots(dateObj);
        const existingReservations = await this.getExistingReservations(date);
        const slotsWithAvailability = timeSlots.map(time => {
            const reservationsAtTime = existingReservations.filter(res => res.time === time);
            const occupiedSeats = reservationsAtTime.reduce((sum, res) => sum + res.numberOfPeople, 0);
            const remainingCapacity = this.maxCapacity - occupiedSeats;
            return {
                time,
                available: remainingCapacity > 0,
                remainingCapacity: Math.max(0, remainingCapacity),
            };
        });
        return {
            date,
            slots: slotsWithAvailability,
        };
    }
    async isSlotAvailable(date, time, numberOfPeople) {
        const existingReservations = await this.getExistingReservations(date);
        const reservationsAtTime = existingReservations.filter(res => res.time === time);
        const occupiedSeats = reservationsAtTime.reduce((sum, res) => sum + res.numberOfPeople, 0);
        return occupiedSeats + numberOfPeople <= this.maxCapacity;
    }
};
exports.TimeSlotsService = TimeSlotsService;
exports.TimeSlotsService = TimeSlotsService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, typeorm_1.InjectRepository)(reservation_entity_1.Reservation)),
    __metadata("design:paramtypes", [typeorm_2.Repository])
], TimeSlotsService);
//# sourceMappingURL=time-slots.service.js.map