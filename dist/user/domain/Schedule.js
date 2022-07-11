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
exports.Schedule = void 0;
const index_1 = require("typeorm/index");
const Travel_1 = require("./Travel");
let Schedule = class Schedule extends index_1.BaseEntity {
};
__decorate([
    (0, index_1.PrimaryGeneratedColumn)(),
    __metadata("design:type", Number)
], Schedule.prototype, "scheduleId", void 0);
__decorate([
    (0, index_1.Column)(),
    __metadata("design:type", String)
], Schedule.prototype, "scheduleName", void 0);
__decorate([
    (0, index_1.Column)(),
    __metadata("design:type", String)
], Schedule.prototype, "date", void 0);
__decorate([
    (0, index_1.Column)(),
    __metadata("design:type", String)
], Schedule.prototype, "time", void 0);
__decorate([
    (0, index_1.Column)(),
    __metadata("design:type", String)
], Schedule.prototype, "location", void 0);
__decorate([
    (0, index_1.Column)({ type: 'decimal', precision: 6, scale: 3, nullable: true }),
    __metadata("design:type", Number)
], Schedule.prototype, "locationX", void 0);
__decorate([
    (0, index_1.Column)({ type: 'decimal', precision: 6, scale: 3, nullable: true }),
    __metadata("design:type", Number)
], Schedule.prototype, "locationY", void 0);
__decorate([
    (0, index_1.ManyToOne)(type => Travel_1.Travel, travel => travel.schedules),
    (0, index_1.JoinColumn)({ name: 'ref_travelId', referencedColumnName: 'travelId' }),
    __metadata("design:type", Travel_1.Travel)
], Schedule.prototype, "travel", void 0);
Schedule = __decorate([
    (0, index_1.Entity)()
], Schedule);
exports.Schedule = Schedule;
//# sourceMappingURL=Schedule.js.map