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
exports.UserController = void 0;
const common_1 = require("@nestjs/common");
const user_service_1 = require("../service/user.service");
const User_1 = require("../domain/User");
const travel_service_1 = require("../service/travel.service");
const auth_1 = require("../../auth");
let UserController = class UserController {
    constructor(userService, travelService) {
        this.userService = userService;
        this.travelService = travelService;
        this.userService = userService;
        this.travelService = travelService;
    }
    async findAll(userId, body) {
        (0, auth_1.validateToken)(userId, body.token);
        const userList = await this.userService.findAll();
        console.log(userList);
        return Object.assign({
            data: userList,
            statusCode: 200,
            statusMsg: `데이터 조회가 성공적으로 완료되었습니다.`,
        });
    }
    async logout(userId, body) {
        (0, auth_1.validateToken)(userId, body.token);
        const user = await this.userService.findOne(userId);
        user.isActive = false;
        await this.userService.saveUser(user);
        return Object.assign({
            data: {
                userId,
            },
            statusCode: 204,
            statusMsg: '데이터 갱신이 성공적으로 완료되었습니다.',
        });
    }
    async findOne(id, body) {
        (0, auth_1.validateToken)(id, body.token);
        const foundUser = await this.userService.findOne(id);
        return Object.assign({
            data: foundUser,
            statusCode: 200,
            statusMsg: `데이터 조회가 성공적으로 완료되었습니다.`,
        });
    }
    async saveUser(user) {
        await this.userService.saveUser(user);
        return Object.assign({
            data: Object.assign({}, user),
            statusCode: 201,
            statusMsg: `saved successfully`,
        });
    }
    async deleteUser(id, body) {
        (0, auth_1.validateToken)(id, body.token);
        await this.userService.deleteUser(id);
        return Object.assign({
            data: { userId: id },
            statusCode: 201,
            statusMsg: `deleted successfully`,
        });
    }
};
__decorate([
    (0, common_1.Get)('list/:userId'),
    __param(0, (0, common_1.Param)('userId')),
    __param(1, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, Object]),
    __metadata("design:returntype", Promise)
], UserController.prototype, "findAll", null);
__decorate([
    (0, common_1.Put)(':userId/logout'),
    __param(0, (0, common_1.Param)('userId')),
    __param(1, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, Object]),
    __metadata("design:returntype", Promise)
], UserController.prototype, "logout", null);
__decorate([
    (0, common_1.Get)(':userId'),
    __param(0, (0, common_1.Param)('userId')),
    __param(1, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, Object]),
    __metadata("design:returntype", Promise)
], UserController.prototype, "findOne", null);
__decorate([
    (0, common_1.Post)(),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [User_1.User]),
    __metadata("design:returntype", Promise)
], UserController.prototype, "saveUser", null);
__decorate([
    (0, common_1.Delete)(':userId'),
    __param(0, (0, common_1.Param)('userId')),
    __param(1, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, Object]),
    __metadata("design:returntype", Promise)
], UserController.prototype, "deleteUser", null);
UserController = __decorate([
    (0, common_1.Controller)('user'),
    __metadata("design:paramtypes", [user_service_1.UserService,
        travel_service_1.TravelService])
], UserController);
exports.UserController = UserController;
//# sourceMappingURL=user.controller.js.map