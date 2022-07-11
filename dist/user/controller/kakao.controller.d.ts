import { AlterService, MyService, KakaoLogin } from '../service/kakao.service';
import { Request, Response } from 'express';
interface PostData {
    data: string;
}
export declare class KakaoController {
    private readonly appService;
    private readonly myService;
    private readonly kakaoLogin;
    constructor(appService: AlterService, myService: MyService, kakaoLogin: KakaoLogin);
    getHello(): string;
    getStaticPath(): string;
    getStaticPathWithService(): string;
    getDynamicPath(data: string): string;
    getDynamicPathWithservice(data: string): string;
    index(): string;
    indexRedirect(): void;
    postData(postBody: string): string;
    postData2(postBody: string): PostData;
    getMyService(): string;
    getMyService2(): string;
    getReact(req: Request, res: Response): void;
    getKakaoLoginPage(): string;
    kakaoLoginLogic(res: any): void;
    kakaoLoginLogicRedirect(qs: any, res: any): void;
    kakaoLoginLogicRedirect2(body: any, res: any): void;
    kakaoLogout(res: any): void;
}
export {};
