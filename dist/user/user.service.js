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
exports.UserService = void 0;
const common_1 = require("@nestjs/common");
const typeorm_1 = require("@nestjs/typeorm");
const User_1 = require("./domain/User");
const index_1 = require("typeorm/index");
let UserService = class UserService {
    constructor(userRepository, connection) {
        this.userRepository = userRepository;
        this.connection = connection;
        this.connection = connection;
        this.userRepository = userRepository;
    }
    findAll() {
        return this.userRepository.find();
    }
    findOne(id) {
        return this.userRepository.findOne({ where: {
                userId: id
            } });
    }
    async saveUser(user) {
        await this.userRepository.save(user);
    }
    async deleteUser(id) {
        await this.userRepository.delete({ userId: id });
    }
    async createUsers(users) {
        let isSuccess = true;
        const queryRunner = this.connection.createQueryRunner();
        await queryRunner.connect();
        await queryRunner.startTransaction();
        try {
            await queryRunner.manager.save(users[0]);
            await queryRunner.manager.save(users[1]);
            await queryRunner.commitTransaction();
        }
        catch (err) {
            console.log('Rollback 실행..');
            await queryRunner.rollbackTransaction();
            isSuccess = false;
        }
        finally {
            await queryRunner.release();
            return isSuccess;
        }
    }
};
UserService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, typeorm_1.InjectRepository)(User_1.User)),
    __metadata("design:paramtypes", [index_1.Repository,
        index_1.Connection])
], UserService);
exports.UserService = UserService;
//# sourceMappingURL=user.service.js.map