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
exports.ReservationsController = void 0;
const common_1 = require("@nestjs/common");
const reservations_service_1 = require("./reservations.service");
const time_slots_service_1 = require("./services/time-slots.service");
const create_reservation_dto_1 = require("./dto/create-reservation.dto");
const jwt_auth_guard_1 = require("../auth/guards/jwt-auth.guard");
let ReservationsController = class ReservationsController {
    constructor(reservationsService, timeSlotsService) {
        this.reservationsService = reservationsService;
        this.timeSlotsService = timeSlotsService;
    }
    async getAvailableSlots(date) {
        if (!date) {
            throw new common_1.BadRequestException('La date est requise');
        }
        return this.timeSlotsService.getAvailableTimeSlots(date);
    }
    async checkAvailability(data) {
        const { date, time, numberOfPeople } = data;
        return {
            available: await this.timeSlotsService.isSlotAvailable(date, time, numberOfPeople),
        };
    }
    async create(createReservationDto) {
        const isAvailable = await this.timeSlotsService.isSlotAvailable(createReservationDto.date, createReservationDto.time, createReservationDto.numberOfPeople);
        if (!isAvailable) {
            throw new common_1.BadRequestException('Ce créneau n\'est pas disponible pour le nombre de personnes demandé');
        }
        return this.reservationsService.create(createReservationDto);
    }
    async findAll() {
        return this.reservationsService.findAll();
    }
    async findOne(id) {
        return this.reservationsService.findOne(id);
    }
    async update(id, updateReservationDto) {
        return this.reservationsService.update(id, updateReservationDto);
    }
    async remove(id) {
        return this.reservationsService.remove(id);
    }
};
exports.ReservationsController = ReservationsController;
__decorate([
    (0, common_1.Get)('available-slots'),
    __param(0, (0, common_1.Query)('date')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], ReservationsController.prototype, "getAvailableSlots", null);
__decorate([
    (0, common_1.Post)('check-availability'),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], ReservationsController.prototype, "checkAvailability", null);
__decorate([
    (0, common_1.Post)(),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [create_reservation_dto_1.CreateReservationDto]),
    __metadata("design:returntype", Promise)
], ReservationsController.prototype, "create", null);
__decorate([
    (0, common_1.Get)(),
    (0, common_1.UseGuards)(jwt_auth_guard_1.JwtAuthGuard),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", Promise)
], ReservationsController.prototype, "findAll", null);
__decorate([
    (0, common_1.Get)(':id'),
    __param(0, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], ReservationsController.prototype, "findOne", null);
__decorate([
    (0, common_1.Put)(':id'),
    (0, common_1.UseGuards)(jwt_auth_guard_1.JwtAuthGuard),
    __param(0, (0, common_1.Param)('id')),
    __param(1, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, Object]),
    __metadata("design:returntype", Promise)
], ReservationsController.prototype, "update", null);
__decorate([
    (0, common_1.Delete)(':id'),
    (0, common_1.UseGuards)(jwt_auth_guard_1.JwtAuthGuard),
    __param(0, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], ReservationsController.prototype, "remove", null);
exports.ReservationsController = ReservationsController = __decorate([
    (0, common_1.Controller)('reservations'),
    __metadata("design:paramtypes", [reservations_service_1.ReservationsService,
        time_slots_service_1.TimeSlotsService])
], ReservationsController);
//# sourceMappingURL=reservations.controller.js.map