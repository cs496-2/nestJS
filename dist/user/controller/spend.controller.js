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
const travelSpend_service_1 = require("../service/travelSpend.service");
const userSpend_service_1 = require("../service/userSpend.service");
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
};
__decorate([
    (0, common_1.Get)(':travelId/stats'),
    __param(0, (0, common_1.Param)('travelId')),
    __param(1, (0, common_1.Param)('userId')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number, String]),
    __metadata("design:returntype", Promise)
], SpendController.prototype, "getStats", null);
__decorate([
    (0, common_1.Get)(':travelId/spends'),
    __param(0, (0, common_1.Param)('userId')),
    __param(1, (0, common_1.Param)('travelId')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, String]),
    __metadata("design:returntype", Promise)
], SpendController.prototype, "getSpend", null);
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