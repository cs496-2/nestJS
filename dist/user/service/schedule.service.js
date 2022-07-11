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
exports.ScheduleService = void 0;
const common_1 = require("@nestjs/common");
const typeorm_1 = require("@nestjs/typeorm");
const User_1 = require("../domain/User");
const index_1 = require("typeorm/index");
const Travel_1 = require("../domain/Travel");
const TravelUserPair_1 = require("../domain/TravelUserPair");
const TravelSpend_1 = require("../domain/TravelSpend");
const UserSpend_1 = require("../domain/UserSpend");
const Schedule_1 = require("../domain/Schedule");
let ScheduleService = class ScheduleService {
    constructor(userRepository, travelRepository, travelUserPairRepository, travelSpendRepository, userSpendRepository, scheduleRepository) {
        this.userRepository = userRepository;
        this.travelRepository = travelRepository;
        this.travelUserPairRepository = travelUserPairRepository;
        this.travelSpendRepository = travelSpendRepository;
        this.userSpendRepository = userSpendRepository;
        this.scheduleRepository = scheduleRepository;
        this.userRepository = userRepository;
        this.travelRepository = travelRepository;
        this.travelUserPairRepository = travelUserPairRepository;
        this.travelSpendRepository = travelSpendRepository;
        this.userSpendRepository = userSpendRepository;
        this.scheduleRepository = scheduleRepository;
    }
    async findAll() {
        return await this.scheduleRepository.find();
    }
    async findOne(id) {
        return await this.scheduleRepository.findOne({ where: {
                scheduleId: id
            } });
    }
    async findWithTravelCondition(travelId) {
        return await this.scheduleRepository.find({
            loadRelationIds: {
                relations: [
                    'travel'
                ],
                disableMixedMap: true
            },
            where: {
                travel: { travelId: travelId }
            }
        });
    }
    async findWithTravelDateCondition(travelId, date) {
        return await this.scheduleRepository.find({
            loadRelationIds: {
                relations: [
                    'travel'
                ],
                disableMixedMap: true
            },
            where: {
                travel: { travelId: travelId },
                date: date
            }
        });
    }
    async saveSchedule(schedule) {
        await this.scheduleRepository.save(schedule);
    }
    async deleteSchedule(id) {
        await this.scheduleRepository.delete({ scheduleId: id });
    }
};
ScheduleService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, typeorm_1.InjectRepository)(User_1.User)),
    __param(1, (0, typeorm_1.InjectRepository)(Travel_1.Travel)),
    __param(2, (0, typeorm_1.InjectRepository)(TravelUserPair_1.TravelUserPair)),
    __param(3, (0, typeorm_1.InjectRepository)(TravelSpend_1.TravelSpend)),
    __param(4, (0, typeorm_1.InjectRepository)(UserSpend_1.UserSpend)),
    __param(5, (0, typeorm_1.InjectRepository)(Schedule_1.Schedule)),
    __metadata("design:paramtypes", [index_1.Repository,
        index_1.Repository,
        index_1.Repository,
        index_1.Repository,
        index_1.Repository,
        index_1.Repository])
], ScheduleService);
exports.ScheduleService = ScheduleService;
//# sourceMappingURL=schedule.service.js.map