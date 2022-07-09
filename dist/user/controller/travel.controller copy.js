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
exports.TravelController = void 0;
const common_1 = require("@nestjs/common");
const user_service_1 = require("../service/user.service");
const User_1 = require("../domain/User");
const travel_service_1 = require("../service/travel.service");
const Travel_1 = require("../domain/Travel");
const travelUserPair_service_1 = require("../service/travelUserPair.service");
const TravelUserPair_1 = require("../domain/TravelUserPair");
const auth_1 = require("../../auth");
const travelSpend_service_1 = require("../service/travelSpend.service");
const userSpend_service_1 = require("../service/userSpend.service");
let TravelController = class TravelController {
    constructor(travelService, travelUserPairService, userService, travelSpendService, userSpendService) {
        this.travelService = travelService;
        this.travelUserPairService = travelUserPairService;
        this.userService = userService;
        this.travelSpendService = travelSpendService;
        this.userSpendService = userSpendService;
        this.travelService = travelService;
        this.travelUserPairService = travelUserPairService;
        this.userService = userService;
        this.travelSpendService = travelSpendService;
        this.userSpendService = userSpendService;
    }
    async findAllTravel(userId) {
        (0, auth_1.validateToken)();
        const travelList = [];
        const travelUserPairs = await this.travelUserPairService.findWithUserCondition(userId);
        for (let i = 0; i < travelUserPairs.length; i++) {
            const element = travelUserPairs[i];
            const addTravel = await this.travelService.findOne(element.travel.travelId);
            travelList.push(addTravel);
        }
        const result = Object.assign({
            data: travelList,
            statusCode: 200,
            statusMsg: `데이터 조회가 성공적으로 완료되었습니다.`,
        });
        return result;
    }
    async giveAllTravelWhenLogin(userId) {
        (0, auth_1.validateToken)();
        const user = await this.userService.findOne(userId);
        user.isActive = true;
        await this.userService.saveUser(user);
        return this.findAllTravel(userId);
    }
    async getStats(travelId, userId) {
        (0, auth_1.validateToken)();
        const travelSpendList = await this.travelSpendService.findWithTravelCondition(travelId);
        const userSpendList = await this.userSpendService.findWithUserTravelCondition(travelId, userId);
        return Object.assign({
            data: {
                travelSpendList,
                userSpendList
            },
            statusCode: 200,
            statusMsg: `데이터 조회가 성공적으로 완료되었습니다.`,
        });
    }
    async getSpend(userId, travelId) {
        (0, auth_1.validateToken)();
        const testResultData = {
            travelSpend: [`testResultData with travelId : ${travelId}`],
            userSpend: [`userSpendTestValue with userId : ${userId}`]
        };
        return Object.assign({
            data: testResultData,
            statusCode: 200,
            statusMsg: `데이터 조회가 성공적으로 완료되었습니다.`,
        });
    }
    async getTravelData(travelId) {
        (0, auth_1.validateToken)();
        const resultTravelData = await this.travelService.findOne(travelId);
        return Object.assign({
            data: resultTravelData,
            statusCode: 200,
            statusMsg: `데이터 조회가 성공적으로 완료되었습니다.`,
        });
    }
    async postTravelData(travelData, userId) {
        (0, auth_1.validateToken)();
        const newTravel = new Travel_1.Travel();
        newTravel.travelName = travelData.travelName;
        newTravel.travelCountry = travelData.travelCountry;
        newTravel.startDate = travelData.startDate;
        newTravel.endDate = travelData.endDate;
        newTravel.foreignCurrency = travelData.foreignCurrency;
        newTravel.coverImg = travelData.coverImg;
        newTravel.totalSpend = 0;
        newTravel.mealSpend = 0;
        newTravel.shopSpend = 0;
        newTravel.tourSpend = 0;
        newTravel.transportSpend = 0;
        newTravel.hotelSpend = 0;
        newTravel.etcSpend = 0;
        await this.travelService.saveTravel(newTravel);
        const user = await this.userService.findOne(userId);
        const newTravelUserPair = new TravelUserPair_1.TravelUserPair();
        newTravelUserPair.travel = newTravel;
        newTravelUserPair.user = user;
        newTravelUserPair.personalTotalSpend = 0;
        newTravelUserPair.personalMealSpend = 0;
        newTravelUserPair.personalShopSpend = 0;
        newTravelUserPair.personalTourSpend = 0;
        newTravelUserPair.personalTransportSpend = 0;
        newTravelUserPair.personalHotelSpend = 0;
        newTravelUserPair.personalEtcSpend = 0;
        await this.travelUserPairService.saveTravelUserPair(newTravelUserPair);
        return Object.assign({
            data: { newTravel,
                newTravelUserPair, },
            statusCode: 201,
            statusMsg: `데이터 추가가 성공적으로 완료되었습니다.`,
        });
    }
    async putTravelData(travelId, userId, travelData) {
        (0, auth_1.validateToken)();
        const updateTravel = await this.travelService.findOne(travelId);
        updateTravel.travelName = travelData.travelName;
        updateTravel.travelCountry = travelData.travelCountry;
        updateTravel.startDate = travelData.startDate;
        updateTravel.endDate = travelData.endDate;
        updateTravel.foreignCurrency = travelData.foreignCurrency;
        updateTravel.coverImg = travelData.coverImg;
        await this.travelService.saveTravel(updateTravel);
        return Object.assign({
            data: updateTravel,
            statusCode: 201,
            statusMsg: `데이터 갱신이 성공적으로 완료되었습니다.`,
        });
    }
    async deleteTravelData(travelId, userId) {
        (0, auth_1.validateToken)();
        await this.travelService.deleteTravel(travelId);
        return Object.assign({
            data: {
                travelId,
            },
            statusCode: 204,
            statusMsg: `데이터 삭제가 성공적으로 완료되었습니다.`,
        });
    }
    async findOne(id) {
        (0, auth_1.validateToken)();
        const foundUser = await this.userService.findOne(id);
        return Object.assign({
            data: foundUser,
            statusCode: 200,
            statusMsg: `데이터 조회가 성공적으로 완료되었습니다.`,
        });
    }
    async saveUser(user) {
        (0, auth_1.validateToken)();
        await this.userService.saveUser(user);
        return Object.assign({
            data: Object.assign({}, user),
            statusCode: 201,
            statusMsg: `saved successfully`,
        });
    }
    async deleteUser(id) {
        (0, auth_1.validateToken)();
        await this.userService.deleteUser(id);
        return Object.assign({
            data: { userId: id },
            statusCode: 201,
            statusMsg: `deleted successfully`,
        });
    }
};
__decorate([
    (0, common_1.Get)('travels'),
    __param(0, (0, common_1.Param)('userId')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], TravelController.prototype, "findAllTravel", null);
__decorate([
    (0, common_1.Put)('travels'),
    __param(0, (0, common_1.Param)('userId')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], TravelController.prototype, "giveAllTravelWhenLogin", null);
__decorate([
    (0, common_1.Get)(':travelId/stats'),
    __param(0, (0, common_1.Param)('travelId')),
    __param(1, (0, common_1.Param)('userId')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number, String]),
    __metadata("design:returntype", Promise)
], TravelController.prototype, "getStats", null);
__decorate([
    (0, common_1.Get)(':travelId/spends'),
    __param(0, (0, common_1.Param)('userId')),
    __param(1, (0, common_1.Param)('travelId')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, String]),
    __metadata("design:returntype", Promise)
], TravelController.prototype, "getSpend", null);
__decorate([
    (0, common_1.Get)(':travelId'),
    __param(0, (0, common_1.Param)('travelId')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number]),
    __metadata("design:returntype", Promise)
], TravelController.prototype, "getTravelData", null);
__decorate([
    (0, common_1.Post)('travel'),
    __param(0, (0, common_1.Body)()),
    __param(1, (0, common_1.Param)('userId')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, String]),
    __metadata("design:returntype", Promise)
], TravelController.prototype, "postTravelData", null);
__decorate([
    (0, common_1.Put)(':travelId'),
    __param(0, (0, common_1.Param)('travelId')),
    __param(1, (0, common_1.Param)('userId')),
    __param(2, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number, String, Object]),
    __metadata("design:returntype", Promise)
], TravelController.prototype, "putTravelData", null);
__decorate([
    (0, common_1.Delete)(':travelId'),
    __param(0, (0, common_1.Param)('travelId')),
    __param(1, (0, common_1.Param)('userId')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number, String]),
    __metadata("design:returntype", Promise)
], TravelController.prototype, "deleteTravelData", null);
__decorate([
    (0, common_1.Get)(':userId'),
    __param(0, (0, common_1.Param)('userId')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], TravelController.prototype, "findOne", null);
__decorate([
    (0, common_1.Post)(),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [User_1.User]),
    __metadata("design:returntype", Promise)
], TravelController.prototype, "saveUser", null);
__decorate([
    (0, common_1.Delete)(':userId'),
    __param(0, (0, common_1.Param)('userId')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], TravelController.prototype, "deleteUser", null);
TravelController = __decorate([
    (0, common_1.Controller)('user/:userId'),
    __metadata("design:paramtypes", [travel_service_1.TravelService,
        travelUserPair_service_1.TravelUserPairService,
        user_service_1.UserService,
        travelSpend_service_1.TravelSpendService,
        userSpend_service_1.UserSpendService])
], TravelController);
exports.TravelController = TravelController;
//# sourceMappingURL=travel.controller%20copy.js.map