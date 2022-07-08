"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.UserDto = void 0;
class UserDto {
    constructor(userId, userName) {
        this._userId = userId;
        this._userName = userName;
    }
    get userId() {
        return this._userId;
    }
    set userId(value) {
        this._userId = value;
    }
    get userName() {
        return this._userName;
    }
    set userName(value) {
        this._userName = value;
    }
}
exports.UserDto = UserDto;
//# sourceMappingURL=user.dto.js.map