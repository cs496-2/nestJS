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
const Schedule_1 = require("../domain/Schedule");
const schedule_service_1 = require("../service/schedule.service");
let TravelController = class TravelController {
    constructor(travelService, travelUserPairService, userService, travelSpendService, userSpendService, scheduleService) {
        this.travelService = travelService;
        this.travelUserPairService = travelUserPairService;
        this.userService = userService;
        this.travelSpendService = travelSpendService;
        this.userSpendService = userSpendService;
        this.scheduleService = scheduleService;
        this.travelService = travelService;
        this.travelUserPairService = travelUserPairService;
        this.userService = userService;
        this.travelSpendService = travelSpendService;
        this.userSpendService = userSpendService;
        this.scheduleService = scheduleService;
    }
    async findAllSchedule(userId, travelId, body) {
        (0, auth_1.validateToken)(userId, body.token);
        const scheduleList = await this.scheduleService.findWithTravelCondition(travelId);
        const returnScheduleList = scheduleList.sort((a, b) => (((new Date(a.date + a.time)) > (new Date(b.date + b.time))) ? 1 : -1));
        const result = Object.assign({
            data: returnScheduleList,
            statusCode: 200,
            statusMsg: `데이터 조회가 성공적으로 완료되었습니다.`,
        });
        return result;
    }
    async findDateSchedule(userId, travelId, date, body) {
        (0, auth_1.validateToken)(userId, body.token);
        const scheduleList = await this.scheduleService.findWithTravelDateCondition(travelId, date);
        const returnScheduleList = scheduleList.sort((a, b) => (((new Date(a.date + a.time)) > (new Date(b.date + b.time))) ? 1 : -1));
        const result = Object.assign({
            data: returnScheduleList,
            statusCode: 200,
            statusMsg: `데이터 조회가 성공적으로 완료되었습니다.`,
        });
        return result;
    }
    async postSchedule(userId, travelId, body) {
        (0, auth_1.validateToken)(userId, body.token);
        const newSchedule = new Schedule_1.Schedule();
        newSchedule.travel = await this.travelService.findOne(travelId);
        newSchedule.scheduleName = body.scheduleName;
        const scheduleDate = new Date(`${body.date} ${body.time}`);
        newSchedule.date = scheduleDate.toLocaleDateString();
        newSchedule.time = scheduleDate.toTimeString().substr(0, 8);
        newSchedule.location = body.location;
        newSchedule.locationX = body.locationX;
        newSchedule.locationY = body.locationY;
        await this.scheduleService.saveSchedule(newSchedule);
        const scheduleList = await this.scheduleService.findWithTravelCondition(travelId);
        const returnScheduleList = scheduleList.sort((a, b) => (((new Date(a.date + a.time)) > (new Date(b.date + b.time))) ? 1 : -1));
        const result = Object.assign({
            data: returnScheduleList,
            statusCode: 201,
            statusMsg: `데이터 추가가 성공적으로 완료되었습니다.`,
        });
        return result;
    }
    async deleteSchedule(userId, travelId, scheduleId, body) {
        (0, auth_1.validateToken)(userId, body.token);
        await this.scheduleService.deleteSchedule(scheduleId);
        const scheduleList = await this.scheduleService.findWithTravelCondition(travelId);
        const returnScheduleList = scheduleList.sort((a, b) => (((new Date(a.date + a.time)) > (new Date(b.date + b.time))) ? 1 : -1));
        const result = Object.assign({
            data: returnScheduleList,
            statusCode: 204,
            statusMsg: `데이터 삭제가 성공적으로 완료되었습니다.`,
        });
        return result;
    }
    async findAllTravel(userId, body) {
        (0, auth_1.validateToken)(userId, body.token);
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
    async giveAllTravelWhenLogin(userId, body) {
        console.log(body);
        (0, auth_1.validateToken)(userId, body.token);
        if (await this.userService.findOne(body.userId) == null) {
            const newUser = new User_1.User();
            newUser.userId = body.userId;
            newUser.userName = body.userName;
            newUser.userPassword = body.userPassword;
            newUser.age = body.age;
            newUser.isActive = body.isActive;
            await this.userService.saveUser(newUser);
        }
        else {
            const user = await this.userService.findOne(userId);
            user.isActive = true;
            await this.userService.saveUser(user);
        }
        return this.findAllTravel(userId, body);
    }
    async addUserToTravel(userId, travelId, addedUserId, body) {
        (0, auth_1.validateToken)(userId, body.token);
        const addedUser = await this.userService.findOne(addedUserId);
        const addedTravel = await this.travelService.findOne(travelId);
        const addedTravelUserPair = new TravelUserPair_1.TravelUserPair();
        addedTravelUserPair.travel = addedTravel;
        addedTravelUserPair.user = addedUser;
        addedTravelUserPair.personalTotalSpend = 0;
        addedTravelUserPair.personalMealSpend = 0;
        addedTravelUserPair.personalShopSpend = 0;
        addedTravelUserPair.personalTourSpend = 0;
        addedTravelUserPair.personalTransportSpend = 0;
        addedTravelUserPair.personalHotelSpend = 0;
        addedTravelUserPair.personalEtcSpend = 0;
        await this.travelUserPairService.saveTravelUserPair(addedTravelUserPair);
        return this.findAllTravel(userId, body);
    }
    async deleteUserFromTravel(userId, travelId, deletedUserId, body) {
        (0, auth_1.validateToken)(userId, body.token);
        const deletedTravelUserPair = await this.travelUserPairService.findWithUserTravelCondition(deletedUserId, travelId);
        await this.travelUserPairService.deleteTravelUserPair(deletedTravelUserPair.travelUserPairId);
        return this.findAllTravel(userId, body);
    }
    async getTravelData(travelId, userId, body) {
        console.log('travel Detail Info requested');
        (0, auth_1.validateToken)(userId, body.token);
        const resultTravelData = await this.travelService.findOne(travelId);
        const joinedUserList = await this.travelUserPairService.findWithTravelCondition(travelId);
        return Object.assign({
            data: {
                resultTravelData,
                joinedUserList
            },
            statusCode: 200,
            statusMsg: `데이터 조회가 성공적으로 완료되었습니다.`,
        });
    }
    async postTravelData(travelData, userId) {
        (0, auth_1.validateToken)(userId, travelData.token);
        const newTravel = new Travel_1.Travel();
        newTravel.travelName = travelData.travelName;
        newTravel.travelCountry = travelData.travelCountry;
        newTravel.startDate = new Date(travelData.startDate);
        newTravel.endDate = new Date(travelData.endDate);
        newTravel.foreignCurrency = travelData.foreignCurrency;
        newTravel.coverImg = travelData.coverImg;
        newTravel.exchangeRate = travelData.exchangeRate;
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
        (0, auth_1.validateToken)(userId, travelData.token);
        const updateTravel = await this.travelService.findOne(travelId);
        updateTravel.travelName = travelData.travelName;
        updateTravel.travelCountry = travelData.travelCountry;
        updateTravel.startDate = new Date(travelData.startDate);
        updateTravel.endDate = new Date(travelData.endDate);
        updateTravel.foreignCurrency = travelData.foreignCurrency;
        updateTravel.coverImg = travelData.coverImg;
        updateTravel.exchangeRate = travelData.exchangeRate;
        await this.travelService.saveTravel(updateTravel);
        return Object.assign({
            data: updateTravel,
            statusCode: 201,
            statusMsg: `데이터 갱신이 성공적으로 완료되었습니다.`,
        });
    }
    async deleteTravelData(travelId, userId, body) {
        (0, auth_1.validateToken)(userId, body.token);
        await this.travelService.deleteTravel(travelId);
        return Object.assign({
            data: {
                travelId,
            },
            statusCode: 204,
            statusMsg: `데이터 삭제가 성공적으로 완료되었습니다.`,
        });
    }
};
__decorate([
    (0, common_1.Get)(':travelId/schedule/list'),
    __param(0, (0, common_1.Param)('userId')),
    __param(1, (0, common_1.Param)('travelId')),
    __param(2, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, Number, Object]),
    __metadata("design:returntype", Promise)
], TravelController.prototype, "findAllSchedule", null);
__decorate([
    (0, common_1.Get)(':travelId/schedule/list/:date'),
    __param(0, (0, common_1.Param)('userId')),
    __param(1, (0, common_1.Param)('travelId')),
    __param(2, (0, common_1.Param)('date')),
    __param(3, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, Number, String, Object]),
    __metadata("design:returntype", Promise)
], TravelController.prototype, "findDateSchedule", null);
__decorate([
    (0, common_1.Post)(':travelId/schedule'),
    __param(0, (0, common_1.Param)('userId')),
    __param(1, (0, common_1.Param)('travelId')),
    __param(2, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, Number, Object]),
    __metadata("design:returntype", Promise)
], TravelController.prototype, "postSchedule", null);
__decorate([
    (0, common_1.Delete)(':travelId/schedule/:scheduleId'),
    __param(0, (0, common_1.Param)('userId')),
    __param(1, (0, common_1.Param)('travelId')),
    __param(2, (0, common_1.Param)('scheduleId')),
    __param(3, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, Number, Number, Object]),
    __metadata("design:returntype", Promise)
], TravelController.prototype, "deleteSchedule", null);
__decorate([
    (0, common_1.Get)('travels'),
    __param(0, (0, common_1.Param)('userId')),
    __param(1, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, Object]),
    __metadata("design:returntype", Promise)
], TravelController.prototype, "findAllTravel", null);
__decorate([
    (0, common_1.Put)('travels'),
    __param(0, (0, common_1.Param)('userId')),
    __param(1, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, Object]),
    __metadata("design:returntype", Promise)
], TravelController.prototype, "giveAllTravelWhenLogin", null);
__decorate([
    (0, common_1.Post)(':travelId/:addedUserId'),
    __param(0, (0, common_1.Param)('userId')),
    __param(1, (0, common_1.Param)('travelId')),
    __param(2, (0, common_1.Param)('addedUserId')),
    __param(3, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, Number, String, Object]),
    __metadata("design:returntype", Promise)
], TravelController.prototype, "addUserToTravel", null);
__decorate([
    (0, common_1.Delete)(':travelId/:deletedUserId'),
    __param(0, (0, common_1.Param)('userId')),
    __param(1, (0, common_1.Param)('travelId')),
    __param(2, (0, common_1.Param)('deletedUserId')),
    __param(3, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, Number, String, Object]),
    __metadata("design:returntype", Promise)
], TravelController.prototype, "deleteUserFromTravel", null);
__decorate([
    (0, common_1.Get)(':travelId'),
    __param(0, (0, common_1.Param)('travelId')),
    __param(1, (0, common_1.Param)('userId')),
    __param(2, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number, String, Object]),
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
    __param(2, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number, String, Object]),
    __metadata("design:returntype", Promise)
], TravelController.prototype, "deleteTravelData", null);
TravelController = __decorate([
    (0, common_1.Controller)('user/:userId'),
    __metadata("design:paramtypes", [travel_service_1.TravelService,
        travelUserPair_service_1.TravelUserPairService,
        user_service_1.UserService,
        travelSpend_service_1.TravelSpendService,
        userSpend_service_1.UserSpendService,
        schedule_service_1.ScheduleService])
], TravelController);
exports.TravelController = TravelController;
//# sourceMappingURL=travel.controller.js.map