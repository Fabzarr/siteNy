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
Object.defineProperty(exports, "__esModule", { value: true });
exports.Configuration = void 0;
const typeorm_1 = require("typeorm");
let Configuration = class Configuration {
};
exports.Configuration = Configuration;
__decorate([
    (0, typeorm_1.PrimaryGeneratedColumn)('uuid'),
    __metadata("design:type", String)
], Configuration.prototype, "id", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'json' }),
    __metadata("design:type", Object)
], Configuration.prototype, "openingHours", void 0);
__decorate([
    (0, typeorm_1.Column)(),
    __metadata("design:type", Number)
], Configuration.prototype, "maxCapacity", void 0);
__decorate([
    (0, typeorm_1.Column)({ default: 2 }),
    __metadata("design:type", Number)
], Configuration.prototype, "minReservationTime", void 0);
__decorate([
    (0, typeorm_1.Column)({ default: 120 }),
    __metadata("design:type", Number)
], Configuration.prototype, "maxReservationTime", void 0);
__decorate([
    (0, typeorm_1.Column)({ default: 15 }),
    __metadata("design:type", Number)
], Configuration.prototype, "reservationInterval", void 0);
__decorate([
    (0, typeorm_1.Column)({ default: true }),
    __metadata("design:type", Boolean)
], Configuration.prototype, "allowReservations", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'text', nullable: true }),
    __metadata("design:type", String)
], Configuration.prototype, "specialAnnouncement", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'json', nullable: true }),
    __metadata("design:type", Array)
], Configuration.prototype, "holidays", void 0);
exports.Configuration = Configuration = __decorate([
    (0, typeorm_1.Entity)()
], Configuration);
//# sourceMappingURL=configuration.entity.js.map