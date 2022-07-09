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
exports.TravelUserPair = void 0;
const index_1 = require("typeorm/index");
const Travel_1 = require("./Travel");
const User_1 = require("./User");
let TravelUserPair = class TravelUserPair extends index_1.BaseEntity {
};
__decorate([
    (0, index_1.PrimaryGeneratedColumn)(),
    __metadata("design:type", Number)
], TravelUserPair.prototype, "travelUserPairId", void 0);
__decorate([
    (0, index_1.ManyToOne)(type => Travel_1.Travel, travel => travel.travelUserPairs),
    (0, index_1.JoinColumn)({ name: 'ref_travelId', referencedColumnName: 'travelId' }),
    __metadata("design:type", Travel_1.Travel)
], TravelUserPair.prototype, "travel", void 0);
__decorate([
    (0, index_1.ManyToOne)(type => User_1.User, user => user.travelUserPairs),
    (0, index_1.JoinColumn)({ name: 'ref_userId', referencedColumnName: 'userId' }),
    __metadata("design:type", User_1.User)
], TravelUserPair.prototype, "user", void 0);
__decorate([
    (0, index_1.Column)(),
    __metadata("design:type", Number)
], TravelUserPair.prototype, "personalTotalSpend", void 0);
__decorate([
    (0, index_1.Column)(),
    __metadata("design:type", Number)
], TravelUserPair.prototype, "personalMealSpend", void 0);
__decorate([
    (0, index_1.Column)(),
    __metadata("design:type", Number)
], TravelUserPair.prototype, "personalShopSpend", void 0);
__decorate([
    (0, index_1.Column)(),
    __metadata("design:type", Number)
], TravelUserPair.prototype, "personalTourSpend", void 0);
__decorate([
    (0, index_1.Column)(),
    __metadata("design:type", Number)
], TravelUserPair.prototype, "personalTransportSpend", void 0);
__decorate([
    (0, index_1.Column)(),
    __metadata("design:type", Number)
], TravelUserPair.prototype, "personalHotelSpend", void 0);
__decorate([
    (0, index_1.Column)(),
    __metadata("design:type", Number)
], TravelUserPair.prototype, "personalEtcSpend", void 0);
TravelUserPair = __decorate([
    (0, index_1.Entity)()
], TravelUserPair);
exports.TravelUserPair = TravelUserPair;
//# sourceMappingURL=TravelUserPair.js.map