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
exports.TravelService = void 0;
const common_1 = require("@nestjs/common");
const typeorm_1 = require("@nestjs/typeorm");
const User_1 = require(".././domain/User");
const index_1 = require("typeorm/index");
const Travel_1 = require(".././domain/Travel");
const TravelUserPair_1 = require(".././domain/TravelUserPair");
const TravelSpend_1 = require(".././domain/TravelSpend");
const UserSpend_1 = require(".././domain/UserSpend");
let TravelService = class TravelService {
    constructor(userRepository, travelRepository, travelUserPairRepository, travelSpendRepository, userSpendRepository) {
        this.userRepository = userRepository;
        this.travelRepository = travelRepository;
        this.travelUserPairRepository = travelUserPairRepository;
        this.travelSpendRepository = travelSpendRepository;
        this.userSpendRepository = userSpendRepository;
        this.userRepository = userRepository;
        this.travelRepository = travelRepository;
        this.travelUserPairRepository = travelUserPairRepository;
        this.travelSpendRepository = travelSpendRepository;
        this.userSpendRepository = userSpendRepository;
    }
    async findAll() {
        return await this.travelRepository.find();
    }
    async findOne(id) {
        return await this.travelRepository.findOne({ where: {
                travelId: id
            } });
    }
    async saveTravel(travel) {
        await this.travelRepository.save(travel);
    }
    async deleteTravel(id) {
        await this.travelRepository.delete({ travelId: id });
    }
};
TravelService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, typeorm_1.InjectRepository)(User_1.User)),
    __param(1, (0, typeorm_1.InjectRepository)(Travel_1.Travel)),
    __param(2, (0, typeorm_1.InjectRepository)(TravelUserPair_1.TravelUserPair)),
    __param(3, (0, typeorm_1.InjectRepository)(TravelSpend_1.TravelSpend)),
    __param(4, (0, typeorm_1.InjectRepository)(UserSpend_1.UserSpend)),
    __metadata("design:paramtypes", [index_1.Repository,
        index_1.Repository,
        index_1.Repository,
        index_1.Repository,
        index_1.Repository])
], TravelService);
exports.TravelService = TravelService;
//# sourceMappingURL=travel.service%20copy%202.js.map