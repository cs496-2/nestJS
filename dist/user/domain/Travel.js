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
exports.Travel = void 0;
const index_1 = require("typeorm/index");
const TravelSpend_1 = require("./TravelSpend");
const TravelUserPair_1 = require("./TravelUserPair");
const UserSpend_1 = require("./UserSpend");
let Travel = class Travel extends index_1.BaseEntity {
};
__decorate([
    (0, index_1.PrimaryGeneratedColumn)(),
    __metadata("design:type", Number)
], Travel.prototype, "travelId", void 0);
__decorate([
    (0, index_1.Column)({ nullable: true }),
    __metadata("design:type", String)
], Travel.prototype, "travelName", void 0);
__decorate([
    (0, index_1.Column)({ nullable: true }),
    __metadata("design:type", String)
], Travel.prototype, "travelCountry", void 0);
__decorate([
    (0, index_1.Column)({ nullable: true }),
    __metadata("design:type", Date)
], Travel.prototype, "startDate", void 0);
__decorate([
    (0, index_1.Column)({ nullable: true }),
    __metadata("design:type", Date)
], Travel.prototype, "endDate", void 0);
__decorate([
    (0, index_1.Column)({ nullable: true }),
    __metadata("design:type", String)
], Travel.prototype, "foreignCurrency", void 0);
__decorate([
    (0, index_1.Column)({ nullable: true }),
    __metadata("design:type", String)
], Travel.prototype, "coverImg", void 0);
__decorate([
    (0, index_1.Column)({ nullable: true }),
    __metadata("design:type", Number)
], Travel.prototype, "totalSpend", void 0);
__decorate([
    (0, index_1.Column)({ nullable: true }),
    __metadata("design:type", Number)
], Travel.prototype, "mealSpend", void 0);
__decorate([
    (0, index_1.Column)({ nullable: true }),
    __metadata("design:type", Number)
], Travel.prototype, "shopSpend", void 0);
__decorate([
    (0, index_1.Column)({ nullable: true }),
    __metadata("design:type", Number)
], Travel.prototype, "tourSpend", void 0);
__decorate([
    (0, index_1.Column)({ nullable: true }),
    __metadata("design:type", Number)
], Travel.prototype, "transportSpend", void 0);
__decorate([
    (0, index_1.Column)({ nullable: true }),
    __metadata("design:type", Number)
], Travel.prototype, "hotelSpend", void 0);
__decorate([
    (0, index_1.Column)({ nullable: true }),
    __metadata("design:type", Number)
], Travel.prototype, "etcSpend", void 0);
__decorate([
    (0, index_1.OneToMany)(type => TravelSpend_1.TravelSpend, travelSpend => travelSpend.travel, {
        onDelete: 'CASCADE',
        eager: true
    }),
    __metadata("design:type", Array)
], Travel.prototype, "travelSpends", void 0);
__decorate([
    (0, index_1.OneToMany)(type => UserSpend_1.UserSpend, userSpend => userSpend.travel, {
        onDelete: 'CASCADE',
        eager: true
    }),
    __metadata("design:type", Array)
], Travel.prototype, "userSpends", void 0);
__decorate([
    (0, index_1.OneToMany)(type => TravelUserPair_1.TravelUserPair, travelUserPair => travelUserPair.travel, {
        onDelete: 'CASCADE',
        eager: true
    }),
    __metadata("design:type", Array)
], Travel.prototype, "travelUserPairs", void 0);
Travel = __decorate([
    (0, index_1.Entity)(),
    (0, index_1.Unique)(['travelId'])
], Travel);
exports.Travel = Travel;
//# sourceMappingURL=Travel.js.map