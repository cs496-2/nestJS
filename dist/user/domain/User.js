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
exports.User = void 0;
const index_1 = require("typeorm/index");
const TravelUserPair_1 = require("./TravelUserPair");
const UserSpend_1 = require("./UserSpend");
let User = class User extends index_1.BaseEntity {
};
__decorate([
    (0, index_1.PrimaryColumn)(),
    __metadata("design:type", String)
], User.prototype, "userId", void 0);
__decorate([
    (0, index_1.Column)({ nullable: true }),
    __metadata("design:type", String)
], User.prototype, "userName", void 0);
__decorate([
    (0, index_1.Column)({ nullable: true }),
    __metadata("design:type", String)
], User.prototype, "userPassword", void 0);
__decorate([
    (0, index_1.Column)({ nullable: true }),
    __metadata("design:type", Number)
], User.prototype, "age", void 0);
__decorate([
    (0, index_1.Column)({ nullable: true }),
    __metadata("design:type", Boolean)
], User.prototype, "isActive", void 0);
__decorate([
    (0, index_1.OneToMany)(type => UserSpend_1.UserSpend, userSpend => userSpend.user, {
        onDelete: 'CASCADE',
        eager: true
    }),
    __metadata("design:type", Array)
], User.prototype, "userSpends", void 0);
__decorate([
    (0, index_1.OneToMany)(type => TravelUserPair_1.TravelUserPair, travelUserPair => travelUserPair.user, {
        onDelete: 'CASCADE',
        eager: true
    }),
    __metadata("design:type", Array)
], User.prototype, "travelUserPairs", void 0);
User = __decorate([
    (0, index_1.Entity)(),
    (0, index_1.Unique)(['userId'])
], User);
exports.User = User;
//# sourceMappingURL=User.js.map