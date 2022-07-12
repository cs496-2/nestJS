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
exports.SpendController = void 0;
const common_1 = require("@nestjs/common");
const user_service_1 = require("../service/user.service");
const travel_service_1 = require("../service/travel.service");
const travelUserPair_service_1 = require("../service/travelUserPair.service");
const auth_1 = require("../../auth");
const TravelSpend_1 = require("../domain/TravelSpend");
const travelSpend_service_1 = require("../service/travelSpend.service");
const userSpend_service_1 = require("../service/userSpend.service");
const UserSpend_1 = require("../domain/UserSpend");
let SpendController = class SpendController {
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
    async getStats(travelId, userId, body) {
        (0, auth_1.validateToken)(userId, body.token);
        const travelForStat = await this.travelService.findOne(travelId);
        const travelUserPairForStat = await this.travelUserPairService.findWithUserTravelCondition(userId, travelId);
        return Object.assign({
            data: {
                travelForStat,
                travelUserPairForStat
            },
            statusCode: 200,
            statusMsg: `데이터 조회가 성공적으로 완료되었습니다.`,
        });
    }
    async getSpendList(userId, travelId, body) {
        (0, auth_1.validateToken)(userId, body.token);
        const getUserSpendList = await this.userSpendService.findWithUserTravelCondition(travelId, userId);
        const getTravelSpendList = await this.travelSpendService.findWithTravelCondition(travelId);
        const resultData = [
            ...getUserSpendList,
            ...getTravelSpendList
        ];
        resultData.sort((a, b) => (a.createdDate > b.createdDate) ? 1 : -1);
        return Object.assign({
            data: resultData,
            statusCode: 200,
            statusMsg: `데이터 조회가 성공적으로 완료되었습니다.`,
        });
    }
    async postSpend(userId, travelId, body) {
        (0, auth_1.validateToken)(userId, body.token);
        let newSpend;
        if (body.isUserSpend) {
            newSpend = new UserSpend_1.UserSpend();
            newSpend.travel = await this.travelService.findOne(travelId);
            newSpend.user = await this.userService.findOne(userId);
            newSpend.spendName = body.spendName;
            newSpend.createdDate = new Date(body.createdDate);
            newSpend.spendAmount = body.spendAmount;
            newSpend.useWon = body.useWon;
            newSpend.spendCategory = body.spendCategory;
            await this.userSpendService.saveUserSpend(newSpend);
            let addedSpendAmount;
            if (newSpend.useWon) {
                addedSpendAmount = newSpend.spendAmount * 1;
                ;
            }
            else {
                addedSpendAmount = newSpend.spendAmount * newSpend.travel.exchangeRate;
            }
            const addedSpendCategory = newSpend.spendCategory;
            const updateTravelUserPair = await this.travelUserPairService.findWithUserTravelCondition(userId, travelId);
            updateTravelUserPair.personalTotalSpend = updateTravelUserPair.personalTotalSpend + addedSpendAmount;
            switch (addedSpendCategory) {
                case 0:
                    updateTravelUserPair.personalMealSpend = updateTravelUserPair.personalMealSpend + addedSpendAmount;
                    break;
                case 1:
                    updateTravelUserPair.personalShopSpend = updateTravelUserPair.personalShopSpend + addedSpendAmount;
                    break;
                case 2:
                    updateTravelUserPair.personalTourSpend = updateTravelUserPair.personalTourSpend + addedSpendAmount;
                    break;
                case 3:
                    updateTravelUserPair.personalTransportSpend = updateTravelUserPair.personalTransportSpend + addedSpendAmount;
                    break;
                case 4:
                    updateTravelUserPair.personalHotelSpend = updateTravelUserPair.personalHotelSpend + addedSpendAmount;
                    break;
                case 5:
                    updateTravelUserPair.personalEtcSpend = updateTravelUserPair.personalEtcSpend + addedSpendAmount;
                    break;
            }
            await this.travelUserPairService.saveTravelUserPair(updateTravelUserPair);
        }
        else {
            newSpend = new TravelSpend_1.TravelSpend();
            newSpend.travel = await this.travelService.findOne(travelId);
            newSpend.spendName = body.spendName;
            newSpend.createdDate = new Date(body.createdDate);
            newSpend.spendAmount = body.spendAmount;
            newSpend.useWon = body.useWon;
            newSpend.spendCategory = body.spendCategory;
            await this.travelSpendService.saveTravelSpend(newSpend);
            let addedSpendAmount;
            if (newSpend.useWon) {
                addedSpendAmount = newSpend.spendAmount * 1;
                ;
            }
            else {
                addedSpendAmount = newSpend.spendAmount * newSpend.travel.exchangeRate;
            }
            const addedSpendCategory = newSpend.spendCategory;
            console.log(addedSpendAmount);
            console.log(addedSpendCategory);
            const updateTravel = await this.travelService.findOne(travelId);
            console.log(updateTravel);
            updateTravel.totalSpend += addedSpendAmount;
            switch (addedSpendCategory) {
                case 0:
                    updateTravel.mealSpend += addedSpendAmount;
                    break;
                case 1:
                    updateTravel.shopSpend += addedSpendAmount;
                    break;
                case 2:
                    updateTravel.tourSpend += addedSpendAmount;
                    break;
                case 3:
                    updateTravel.transportSpend += addedSpendAmount;
                    break;
                case 4:
                    updateTravel.hotelSpend += addedSpendAmount;
                    break;
                case 5:
                    updateTravel.etcSpend += addedSpendAmount;
                    break;
            }
            await this.travelService.saveTravel(updateTravel);
        }
        const getUserSpendList = await this.userSpendService.findWithUserTravelCondition(travelId, userId);
        const getTravelSpendList = await this.travelSpendService.findWithTravelCondition(travelId);
        const resultData = {
            getUserSpendList,
            getTravelSpendList
        };
        return Object.assign({
            data: {
                newSpend,
                resultData
            },
            statusCode: 201,
            statusMsg: '데이터 삽입이 성공적으로 완료되었습니다.',
        });
    }
    async getSpend(userId, travelId, spendId, body) {
        (0, auth_1.validateToken)(userId, body.token);
        let getSpend;
        if (body.isUserSpend) {
            getSpend = await this.userSpendService.findOne(spendId);
        }
        else {
            getSpend = await this.travelSpendService.findOne(spendId);
        }
        return Object.assign({
            data: {
                getSpend
            },
            statusCode: 200,
            statusMsg: '데이터 조회가 성공적으로 완료되었습니다.',
        });
    }
    async putSpend(userId, travelId, spendId, body) {
        (0, auth_1.validateToken)(userId, body.token);
        let updateSpend;
        if (body.isUserSpend) {
            updateSpend = await this.userSpendService.findOne(spendId);
            let deletedSpendAmount;
            if (updateSpend.useWon) {
                deletedSpendAmount = updateSpend.spendAmount;
            }
            else {
                deletedSpendAmount = updateSpend.spendAmount * (await this.travelService.findOne(updateSpend.travel.travelId)).exchangeRate;
            }
            const deletedSpendCategory = updateSpend.spendCategory;
            updateSpend.spendName = body.spendName;
            updateSpend.createdDate = new Date(body.createdDate);
            updateSpend.spendAmount = body.spendAmount;
            updateSpend.useWon = body.useWon;
            updateSpend.spendCategory = body.spendCategory;
            await this.userSpendService.saveUserSpend(updateSpend);
            let addedSpendAmount;
            if (updateSpend.useWon) {
                addedSpendAmount = updateSpend.spendAmount;
            }
            else {
                addedSpendAmount = updateSpend.spendAmount * (await this.travelService.findOne(updateSpend.travel.travelId)).exchangeRate;
            }
            const addedSpendCategory = updateSpend.spendCategory;
            const updateTravelUserPair = await this.travelUserPairService.findWithUserTravelCondition(userId, travelId);
            updateTravelUserPair.personalTotalSpend -= deletedSpendAmount;
            switch (deletedSpendCategory) {
                case 0:
                    updateTravelUserPair.personalMealSpend -= deletedSpendAmount;
                    break;
                case 1:
                    updateTravelUserPair.personalShopSpend -= deletedSpendAmount;
                    break;
                case 2:
                    updateTravelUserPair.personalTourSpend -= deletedSpendAmount;
                    break;
                case 3:
                    updateTravelUserPair.personalTransportSpend -= deletedSpendAmount;
                    break;
                case 4:
                    updateTravelUserPair.personalHotelSpend -= deletedSpendAmount;
                    break;
                case 5:
                    updateTravelUserPair.personalEtcSpend -= deletedSpendAmount;
                    break;
            }
            updateTravelUserPair.personalTotalSpend += addedSpendAmount;
            switch (addedSpendCategory) {
                case 0:
                    updateTravelUserPair.personalMealSpend += addedSpendAmount;
                    break;
                case 1:
                    updateTravelUserPair.personalShopSpend += addedSpendAmount;
                    break;
                case 2:
                    updateTravelUserPair.personalTourSpend += addedSpendAmount;
                    break;
                case 3:
                    updateTravelUserPair.personalTransportSpend += addedSpendAmount;
                    break;
                case 4:
                    updateTravelUserPair.personalHotelSpend += addedSpendAmount;
                    break;
                case 5:
                    updateTravelUserPair.personalEtcSpend += addedSpendAmount;
                    break;
            }
            await this.travelUserPairService.saveTravelUserPair(updateTravelUserPair);
        }
        else {
            updateSpend = await this.travelSpendService.findOne(spendId);
            let deletedSpendAmount;
            if (updateSpend.useWon) {
                deletedSpendAmount = updateSpend.spendAmount;
            }
            else {
                deletedSpendAmount = updateSpend.spendAmount * (await this.travelService.findOne(updateSpend.travel.travelId)).exchangeRate;
            }
            const deletedSpendCategory = updateSpend.spendCategory;
            updateSpend.spendName = body.spendName;
            updateSpend.createdDate = new Date(body.createdDate);
            updateSpend.spendAmount = body.spendAmount;
            updateSpend.useWon = body.useWon;
            updateSpend.spendCategory = body.spendCategory;
            await this.travelSpendService.saveTravelSpend(updateSpend);
            let addedSpendAmount;
            if (updateSpend.useWon) {
                addedSpendAmount = updateSpend.spendAmount;
            }
            else {
                addedSpendAmount = updateSpend.spendAmount * (await this.travelService.findOne(updateSpend.travel.travelId)).exchangeRate;
            }
            const addedSpendCategory = updateSpend.spendCategory;
            const updateTravel = await this.travelService.findOne(travelId);
            updateTravel.totalSpend -= deletedSpendAmount;
            switch (deletedSpendCategory) {
                case 0:
                    updateTravel.mealSpend -= deletedSpendAmount;
                    break;
                case 1:
                    updateTravel.shopSpend -= deletedSpendAmount;
                    break;
                case 2:
                    updateTravel.tourSpend -= deletedSpendAmount;
                    break;
                case 3:
                    updateTravel.transportSpend -= deletedSpendAmount;
                    break;
                case 4:
                    updateTravel.hotelSpend -= deletedSpendAmount;
                    break;
                case 5:
                    updateTravel.etcSpend -= deletedSpendAmount;
                    break;
            }
            updateTravel.totalSpend += addedSpendAmount;
            switch (addedSpendCategory) {
                case 0:
                    updateTravel.mealSpend += addedSpendAmount;
                    break;
                case 1:
                    updateTravel.shopSpend += addedSpendAmount;
                    break;
                case 2:
                    updateTravel.tourSpend += addedSpendAmount;
                    break;
                case 3:
                    updateTravel.transportSpend += addedSpendAmount;
                    break;
                case 4:
                    updateTravel.hotelSpend += addedSpendAmount;
                    break;
                case 5:
                    updateTravel.etcSpend += addedSpendAmount;
                    break;
            }
            await this.travelService.saveTravel(updateTravel);
        }
        const getUserSpendList = await this.userSpendService.findWithUserTravelCondition(travelId, userId);
        const getTravelSpendList = await this.travelSpendService.findWithTravelCondition(travelId);
        const resultData = {
            getUserSpendList,
            getTravelSpendList
        };
        return Object.assign({
            data: {
                updateSpend,
                resultData
            },
            statusCode: 201,
            statusMsg: '데이터 수정이 성공적으로 완료되었습니다.',
        });
    }
    async deleteSpend(userId, travelId, spendId, body, isUserSpend) {
        (0, auth_1.validateToken)(userId, body.token);
        console.log(`isUserSpend??? : ${isUserSpend}\n type of isUserSpend??? : ${typeof isUserSpend}`);
        if (isUserSpend == 'true') {
            const deletedUserSpend = await this.userSpendService.findOne(spendId);
            console.log(deletedUserSpend);
            let deletedSpendAmount;
            if (deletedUserSpend.useWon) {
                deletedSpendAmount = deletedUserSpend.spendAmount;
            }
            else {
                deletedSpendAmount = deletedUserSpend.spendAmount * (await this.travelService.findOne(deletedUserSpend.travel.travelId)).exchangeRate;
            }
            const deletedSpendCategory = deletedUserSpend.spendCategory;
            await this.userSpendService.deleteUserSpend(spendId);
            const updateTravelUserPair = await this.travelUserPairService.findWithUserTravelCondition(userId, travelId);
            updateTravelUserPair.personalTotalSpend -= deletedSpendAmount;
            switch (deletedSpendCategory) {
                case 0:
                    updateTravelUserPair.personalMealSpend -= deletedSpendAmount;
                    break;
                case 1:
                    updateTravelUserPair.personalShopSpend -= deletedSpendAmount;
                    break;
                case 2:
                    updateTravelUserPair.personalTourSpend -= deletedSpendAmount;
                    break;
                case 3:
                    updateTravelUserPair.personalTransportSpend -= deletedSpendAmount;
                    break;
                case 4:
                    updateTravelUserPair.personalHotelSpend -= deletedSpendAmount;
                    break;
                case 5:
                    updateTravelUserPair.personalEtcSpend -= deletedSpendAmount;
                    break;
            }
            await this.travelUserPairService.saveTravelUserPair(updateTravelUserPair);
        }
        else {
            const deletedTravelSpend = await this.travelSpendService.findOne(spendId);
            console.log(deletedTravelSpend);
            let deletedSpendAmount;
            if (deletedTravelSpend.useWon) {
                deletedSpendAmount = deletedTravelSpend.spendAmount;
            }
            else {
                deletedSpendAmount = deletedTravelSpend.spendAmount * (await this.travelService.findOne(deletedTravelSpend.travel.travelId)).exchangeRate;
            }
            const deletedSpendCategory = deletedTravelSpend.spendCategory;
            await this.travelSpendService.deleteTravelSpend(spendId);
            const updateTravel = await this.travelService.findOne(travelId);
            updateTravel.totalSpend -= deletedSpendAmount;
            switch (deletedSpendCategory) {
                case 0:
                    updateTravel.mealSpend -= deletedSpendAmount;
                    break;
                case 1:
                    updateTravel.shopSpend -= deletedSpendAmount;
                    break;
                case 2:
                    updateTravel.tourSpend -= deletedSpendAmount;
                    break;
                case 3:
                    updateTravel.transportSpend -= deletedSpendAmount;
                    break;
                case 4:
                    updateTravel.hotelSpend -= deletedSpendAmount;
                    break;
                case 5:
                    updateTravel.etcSpend -= deletedSpendAmount;
                    break;
            }
            await this.travelService.saveTravel(updateTravel);
        }
        const getUserSpendList = await this.userSpendService.findWithUserTravelCondition(travelId, userId);
        const getTravelSpendList = await this.travelSpendService.findWithTravelCondition(travelId);
        const resultData = {
            getUserSpendList,
            getTravelSpendList
        };
        return Object.assign({
            data: {
                spendId,
                resultData
            },
            statusCode: 204,
            statusMsg: '데이터 제거가 성공적으로 완료되었습니다.'
        });
    }
};
__decorate([
    (0, common_1.Get)('stats'),
    __param(0, (0, common_1.Param)('travelId')),
    __param(1, (0, common_1.Param)('userId')),
    __param(2, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number, String, Object]),
    __metadata("design:returntype", Promise)
], SpendController.prototype, "getStats", null);
__decorate([
    (0, common_1.Get)('spends'),
    __param(0, (0, common_1.Param)('userId')),
    __param(1, (0, common_1.Param)('travelId')),
    __param(2, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, Number, Object]),
    __metadata("design:returntype", Promise)
], SpendController.prototype, "getSpendList", null);
__decorate([
    (0, common_1.Post)(),
    __param(0, (0, common_1.Param)('userId')),
    __param(1, (0, common_1.Param)('travelId')),
    __param(2, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, Number, Object]),
    __metadata("design:returntype", Promise)
], SpendController.prototype, "postSpend", null);
__decorate([
    (0, common_1.Get)(':spendId'),
    __param(0, (0, common_1.Param)('userId')),
    __param(1, (0, common_1.Param)('travelId')),
    __param(2, (0, common_1.Param)('spendId')),
    __param(3, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, Number, Number, Object]),
    __metadata("design:returntype", Promise)
], SpendController.prototype, "getSpend", null);
__decorate([
    (0, common_1.Put)(':spendId'),
    __param(0, (0, common_1.Param)('userId')),
    __param(1, (0, common_1.Param)('travelId')),
    __param(2, (0, common_1.Param)('spendId')),
    __param(3, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, Number, Number, Object]),
    __metadata("design:returntype", Promise)
], SpendController.prototype, "putSpend", null);
__decorate([
    (0, common_1.Delete)('delete/:spendId/:isUserSpend'),
    __param(0, (0, common_1.Param)('userId')),
    __param(1, (0, common_1.Param)('travelId')),
    __param(2, (0, common_1.Param)('spendId')),
    __param(3, (0, common_1.Body)()),
    __param(4, (0, common_1.Param)('isUserSpend')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, Number, Number, Object, String]),
    __metadata("design:returntype", Promise)
], SpendController.prototype, "deleteSpend", null);
SpendController = __decorate([
    (0, common_1.Controller)('user/:userId/:travelId'),
    __metadata("design:paramtypes", [travel_service_1.TravelService,
        travelUserPair_service_1.TravelUserPairService,
        user_service_1.UserService,
        travelSpend_service_1.TravelSpendService,
        userSpend_service_1.UserSpendService])
], SpendController);
exports.SpendController = SpendController;
//# sourceMappingURL=spend.controller.js.map