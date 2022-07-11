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
exports.KakaoController = void 0;
const common_1 = require("@nestjs/common");
const kakao_service_1 = require("../service/kakao.service");
const path_1 = require("path");
let KakaoController = class KakaoController {
    constructor(appService, myService, kakaoLogin) {
        this.appService = appService;
        this.myService = myService;
        this.kakaoLogin = kakaoLogin;
    }
    getHello() {
        return this.appService.getHello();
    }
    getStaticPath() {
        return `data : StaticPath`;
    }
    getStaticPathWithService() {
        return this.appService.getStaticPathWithService();
    }
    getDynamicPath(data) {
        return `data : DynamicPath(${data})`;
    }
    getDynamicPathWithservice(data) {
        return this.appService.getDynamicPathWithservice(data);
    }
    index() {
        return '<h2>Nest HTML</h2>';
    }
    indexRedirect() {
        return;
    }
    postData(postBody) {
        return JSON.stringify({ data: postBody });
    }
    postData2(postBody) {
        return { data: postBody };
    }
    getMyService() {
        this.myService.setData('Hi ? My Service !');
        return this.myService.getData();
    }
    getMyService2() {
        return this.myService.getData();
    }
    getReact(req, res) {
        return res.sendFile((0, path_1.join)(__dirname, '../views/react/index.html'));
    }
    getKakaoLoginPage() {
        return `
      <div>
        <h1>카카오 로그인</h1>

        <form action="/kakaoLoginLogic" method="GET">
          <input type="submit" value="카카오로그인" />
        </form>

        <form action="/kakaoLogout" method="GET">
          <input type="submit" value="카카오로그아웃 및 연결 끊기" />
        </form>

        <button onclick="window.close()">close window</button>
      </div>
    `;
    }
    kakaoLoginLogic(res) {
        const _hostName = 'https://kauth.kakao.com';
        const _restApiKey = '16c296c98e32e8be9acbc9f9a4d0bc85';
        const _redirectUrl = 'http://127.0.0.1:3000/auth/kakao/redirect';
        const url = `${_hostName}/oauth/authorize?client_id=${_restApiKey}&redirect_uri=${_redirectUrl}&response_type=code`;
        return res.redirect(url);
    }
    kakaoLoginLogicRedirect(qs, res) {
        console.log(qs.code);
        console.log(qs.code);
        console.log(qs.code);
        console.log(qs.code);
        console.log(qs.code);
        console.log(qs.code);
        console.log(qs.code);
        const _restApiKey = '16c296c98e32e8be9acbc9f9a4d0bc85';
        const _redirect_uri = 'http://127.0.0.1:3000/auth/kakao/redirect';
        const _hostName = `https://kauth.kakao.com/oauth/token?grant_type=authorization_code&client_id=${_restApiKey}&redirect_uri=${_redirect_uri}&code=${qs.code}`;
        const _hostNameForUserInfoGet = 'https://kapi.kakao.com/v2/user/me';
        const _headers = {
            headers: {
                'Content-Type': 'application/x-www-form-urlencoded;charset=utf-8',
            },
        };
        const _headersForUserInfoGet = {
            headers: {
                Authorization: null,
                'Content-Type': 'application/x-www-form-urlencoded;charset=utf-8',
            },
        };
        this.kakaoLogin
            .login(_hostName, _headers)
            .then((e) => {
            console.log(`TOKEN : ${e.data['access_token']}`);
            this.kakaoLogin.setToken(e.data['access_token']);
            return;
        })
            .then((e) => {
            return this.kakaoLogin.getUserInfo(_hostNameForUserInfoGet, _headersForUserInfoGet);
        })
            .then((e) => {
            console.log('GOT THE FINAL RESOINSE!!!');
            console.log(e.data);
            res.send(`
          <div>
            <h2>축하합니다!</h2>
            <p>카카오 로그인 성공하였습니다 :)</p>
            <p>반갑습니다${e.data.kakao_account.email}님!</p>
            <a href="/kakaoLogin">메인으로</a>
          </div>
        `);
            return;
        })
            .catch((err) => {
            console.log(err);
            return res.send('error');
        });
    }
    kakaoLoginLogicRedirect2(body, res) {
        console.log(body.code);
        const _restApiKey = '16c296c98e32e8be9acbc9f9a4d0bc85';
        const _redirect_uri = 'http://127.0.0.1:3000/auth/kakao/redirect';
        const _hostName = `https://kauth.kakao.com/oauth/token?grant_type=authorization_code&client_id=${_restApiKey}&redirect_uri=${_redirect_uri}&code=${body.code}`;
        const _hostNameForUserInfoGet = 'https://kapi.kakao.com/v2/user/me';
        const _headers = {
            headers: {
                'Content-Type': 'application/x-www-form-urlencoded;charset=utf-8',
            },
        };
        const _headersForUserInfoGet = {
            headers: {
                Authorization: null,
                'Content-Type': 'application/x-www-form-urlencoded;charset=utf-8',
            },
        };
        this.kakaoLogin
            .login(_hostName, _headers)
            .then((e) => {
            console.log(`TOKEN : ${e.data['access_token']}`);
            this.kakaoLogin.setToken(e.data['access_token']);
            return;
        })
            .then((e) => {
            return this.kakaoLogin.getUserInfo(_hostNameForUserInfoGet, _headersForUserInfoGet);
        })
            .then((e) => {
            console.log('GOT THE FINAL RESOINSE!!!');
            console.log(e.data);
            res.send(`
          <div>
            <h2>축하합니다!</h2>
            <p>카카오 로그인 성공하였습니다 :)</p>
            <p>반갑습니다${e.data.kakao_account.email}님!</p>
            <a href="/kakaoLogin">메인으로</a>
          </div>
        `);
            return;
        })
            .catch((err) => {
            console.log(err);
            return res.send('error');
        });
    }
    kakaoLogout(res) {
        console.log(`LOGOUT TOKEN : ${this.kakaoLogin.accessToken}`);
        this.kakaoLogin
            .deleteLog()
            .then((e) => {
            return res.send(`
          <div>
            <h2>로그아웃 완료(연결끊기)</h2>
            <a href="/kakaoLogin">메인 화면으로</a>
          </div>
        `);
        })
            .catch((e) => {
            console.log(e);
            return res.send('DELETE ERROR');
        });
    }
};
__decorate([
    (0, common_1.Get)(),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", String)
], KakaoController.prototype, "getHello", null);
__decorate([
    (0, common_1.Get)('/b'),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", String)
], KakaoController.prototype, "getStaticPath", null);
__decorate([
    (0, common_1.Get)('/b2'),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", String)
], KakaoController.prototype, "getStaticPathWithService", null);
__decorate([
    (0, common_1.Get)('/b/:data'),
    __param(0, (0, common_1.Param)('data')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", String)
], KakaoController.prototype, "getDynamicPath", null);
__decorate([
    (0, common_1.Get)('/b2/:data'),
    __param(0, (0, common_1.Param)('data')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", String)
], KakaoController.prototype, "getDynamicPathWithservice", null);
__decorate([
    (0, common_1.Get)('/index'),
    (0, common_1.Header)('Content-Type', 'text/html'),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", String)
], KakaoController.prototype, "index", null);
__decorate([
    (0, common_1.Get)('/index/*'),
    (0, common_1.Redirect)('/', 302),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", void 0)
], KakaoController.prototype, "indexRedirect", null);
__decorate([
    (0, common_1.Post)('/data'),
    (0, common_1.Header)('Content-Type', 'application/json'),
    __param(0, (0, common_1.Body)('data')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", String)
], KakaoController.prototype, "postData", null);
__decorate([
    (0, common_1.Post)('/data2'),
    (0, common_1.Header)('Content-Type', 'application/json'),
    __param(0, (0, common_1.Body)('data')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Object)
], KakaoController.prototype, "postData2", null);
__decorate([
    (0, common_1.Get)('myService'),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", String)
], KakaoController.prototype, "getMyService", null);
__decorate([
    (0, common_1.Get)('myService2'),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", String)
], KakaoController.prototype, "getMyService2", null);
__decorate([
    (0, common_1.Get)('reactjs*'),
    __param(0, (0, common_1.Req)()),
    __param(1, (0, common_1.Res)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, Object]),
    __metadata("design:returntype", void 0)
], KakaoController.prototype, "getReact", null);
__decorate([
    (0, common_1.Get)('kakaoLogin'),
    (0, common_1.Header)('Content-Type', 'text/html'),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", String)
], KakaoController.prototype, "getKakaoLoginPage", null);
__decorate([
    (0, common_1.Get)('kakaoLoginLogic'),
    (0, common_1.Header)('Content-Type', 'text/html'),
    __param(0, (0, common_1.Res)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", void 0)
], KakaoController.prototype, "kakaoLoginLogic", null);
__decorate([
    (0, common_1.Get)('auth/kakao/redirect'),
    (0, common_1.Header)('Content-Type', 'text/html'),
    __param(0, (0, common_1.Query)()),
    __param(1, (0, common_1.Res)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, Object]),
    __metadata("design:returntype", void 0)
], KakaoController.prototype, "kakaoLoginLogicRedirect", null);
__decorate([
    (0, common_1.Get)('auth/kakao/redirect2'),
    (0, common_1.Header)('Content-Type', 'text/html'),
    __param(0, (0, common_1.Body)()),
    __param(1, (0, common_1.Res)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, Object]),
    __metadata("design:returntype", void 0)
], KakaoController.prototype, "kakaoLoginLogicRedirect2", null);
__decorate([
    (0, common_1.Get)('kakaoLogout'),
    __param(0, (0, common_1.Res)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", void 0)
], KakaoController.prototype, "kakaoLogout", null);
KakaoController = __decorate([
    (0, common_1.Controller)(),
    __metadata("design:paramtypes", [kakao_service_1.AlterService,
        kakao_service_1.MyService,
        kakao_service_1.KakaoLogin])
], KakaoController);
exports.KakaoController = KakaoController;
//# sourceMappingURL=kakao.controller.js.map