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
exports.TravelSpend = void 0;
const index_1 = require("typeorm/index");
const Travel_1 = require("./Travel");
let TravelSpend = class TravelSpend extends index_1.BaseEntity {
};
__decorate([
    (0, index_1.PrimaryGeneratedColumn)(),
    __metadata("design:type", Number)
], TravelSpend.prototype, "travelSpendId", void 0);
__decorate([
    (0, index_1.ManyToOne)(type => Travel_1.Travel, travel => travel.travelSpends, {
        onDelete: 'CASCADE'
    }),
    (0, index_1.JoinColumn)({ name: 'ref_travelId', referencedColumnName: 'travelId' }),
    __metadata("design:type", Travel_1.Travel)
], TravelSpend.prototype, "travel", void 0);
__decorate([
    (0, index_1.Column)(),
    __metadata("design:type", String)
], TravelSpend.prototype, "spendName", void 0);
__decorate([
    (0, index_1.Column)({ nullable: true }),
    __metadata("design:type", Date)
], TravelSpend.prototype, "createdDate", void 0);
__decorate([
    (0, index_1.Column)({ nullable: true }),
    __metadata("design:type", Number)
], TravelSpend.prototype, "spendAmount", void 0);
__decorate([
    (0, index_1.Column)({ nullable: true }),
    __metadata("design:type", Boolean)
], TravelSpend.prototype, "useWon", void 0);
__decorate([
    (0, index_1.Column)({ nullable: true }),
    __metadata("design:type", Number)
], TravelSpend.prototype, "spendCategory", void 0);
TravelSpend = __decorate([
    (0, index_1.Entity)()
], TravelSpend);
exports.TravelSpend = TravelSpend;
//# sourceMappingURL=TravelSpend.js.map