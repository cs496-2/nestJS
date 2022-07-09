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
exports.UserSpend = void 0;
const index_1 = require("typeorm/index");
const Travel_1 = require("./Travel");
const User_1 = require("./User");
let UserSpend = class UserSpend extends index_1.BaseEntity {
};
__decorate([
    (0, index_1.PrimaryGeneratedColumn)(),
    __metadata("design:type", Number)
], UserSpend.prototype, "userSpendId", void 0);
__decorate([
    (0, index_1.ManyToOne)(type => Travel_1.Travel, travel => travel.userSpends),
    (0, index_1.JoinColumn)({ name: 'ref_travelId', referencedColumnName: 'travelId' }),
    __metadata("design:type", Travel_1.Travel)
], UserSpend.prototype, "travel", void 0);
__decorate([
    (0, index_1.ManyToOne)(type => User_1.User, user => user.userSpends),
    (0, index_1.JoinColumn)({ name: 'ref_userId', referencedColumnName: 'userId' }),
    __metadata("design:type", User_1.User)
], UserSpend.prototype, "user", void 0);
__decorate([
    (0, index_1.Column)(),
    __metadata("design:type", String)
], UserSpend.prototype, "spendName", void 0);
__decorate([
    (0, index_1.Column)(),
    __metadata("design:type", Date)
], UserSpend.prototype, "createdDate", void 0);
__decorate([
    (0, index_1.Column)(),
    __metadata("design:type", Number)
], UserSpend.prototype, "spendAmount", void 0);
__decorate([
    (0, index_1.Column)(),
    __metadata("design:type", Boolean)
], UserSpend.prototype, "useWon", void 0);
__decorate([
    (0, index_1.Column)(),
    __metadata("design:type", Number)
], UserSpend.prototype, "spendCategory", void 0);
UserSpend = __decorate([
    (0, index_1.Entity)()
], UserSpend);
exports.UserSpend = UserSpend;
//# sourceMappingURL=UserSpend.js.map