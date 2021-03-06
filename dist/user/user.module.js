"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.UserModule = void 0;
const common_1 = require("@nestjs/common");
const user_controller_1 = require("./controller/user.controller");
const user_service_1 = require("./service/user.service");
const typeorm_1 = require("@nestjs/typeorm");
const User_1 = require("./domain/User");
const Schedule_1 = require("./domain/Schedule");
const Travel_1 = require("./domain/Travel");
const TravelSpend_1 = require("./domain/TravelSpend");
const UserSpend_1 = require("./domain/UserSpend");
const TravelUserPair_1 = require("./domain/TravelUserPair");
const travel_controller_1 = require("./controller/travel.controller");
const travel_service_1 = require("./service/travel.service");
const travelUserPair_service_1 = require("./service/travelUserPair.service");
const travelSpend_service_1 = require("./service/travelSpend.service");
const userSpend_service_1 = require("./service/userSpend.service");
const spend_controller_1 = require("./controller/spend.controller");
const schedule_service_1 = require("./service/schedule.service");
let UserModule = class UserModule {
};
UserModule = __decorate([
    (0, common_1.Module)({
        imports: [typeorm_1.TypeOrmModule.forFeature([User_1.User, Schedule_1.Schedule, Travel_1.Travel, TravelSpend_1.TravelSpend, UserSpend_1.UserSpend, TravelUserPair_1.TravelUserPair])],
        controllers: [user_controller_1.UserController, travel_controller_1.TravelController, spend_controller_1.SpendController],
        providers: [user_service_1.UserService, travel_service_1.TravelService, travelUserPair_service_1.TravelUserPairService, travelSpend_service_1.TravelSpendService, userSpend_service_1.UserSpendService, schedule_service_1.ScheduleService],
    })
], UserModule);
exports.UserModule = UserModule;
//# sourceMappingURL=user.module.js.map