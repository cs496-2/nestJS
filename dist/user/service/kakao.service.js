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
Object.defineProperty(exports, "__esModule", { value: true });
exports.KakaoLogin = exports.MyService = exports.AlterService = void 0;
const common_1 = require("@nestjs/common");
let AlterService = class AlterService {
    constructor() {
        this.getStaticPathWithService = () => 'data : getStaticPathWithService';
    }
    getHello() {
        return 'Hello World!';
    }
    getDynamicPathWithservice(data) {
        return `data : getDynamicPathWithservice(${data})`;
    }
};
AlterService = __decorate([
    (0, common_1.Injectable)()
], AlterService);
exports.AlterService = AlterService;
let MyService = class MyService {
    getData() {
        return this.data;
    }
    setData(data) {
        this.data = data;
        return;
    }
};
MyService = __decorate([
    (0, common_1.Injectable)()
], MyService);
exports.MyService = MyService;
let KakaoLogin = class KakaoLogin {
    constructor() {
        this.check = false;
        this.http = new common_1.HttpService();
        this.accessToken = '';
    }
    loginCheck() {
        this.check = !this.check;
        return;
    }
    async login(url, headers) {
        console.log('login arrived');
        let res;
        try {
            res = await this.http.post(url, '', { headers }).toPromise();
        }
        catch (e) {
            console.log(e);
        }
        console.log('response from kakao login');
        this.accessToken = res.data['access_token'];
        console.log(this.accessToken);
        return res;
    }
    async getUserInfo(url, headers) {
        console.log('get User Info Function starts');
        console.log(headers);
        const headerForReq = headers.headers;
        console.log(headerForReq);
        headerForReq.Authorization = 'Bearer ${' + this.accessToken + '}';
        console.log('get userinfo with...');
        console.log(headerForReq);
        const res = await this.http.get(url, { headers: headerForReq }).toPromise();
        console.log('result is ');
        console.log(res.data);
        return res;
    }
    setToken(token) {
        this.accessToken = token;
        return true;
    }
    async logout() {
        const _url = 'https://kapi.kakao.com/v1/user/logout';
        const _header = {
            Authorization: `bearer ${this.accessToken}`,
        };
        return await this.http.post(_url, '', { headers: _header }).toPromise();
    }
    async deleteLog() {
        const _url = 'https://kapi.kakao.com/v1/user/unlink';
        const _header = {
            Authorization: `bearer ${this.accessToken}`,
        };
        return await this.http.post(_url, '', { headers: _header }).toPromise();
    }
};
KakaoLogin = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [])
], KakaoLogin);
exports.KakaoLogin = KakaoLogin;
//# sourceMappingURL=kakao.service.js.map