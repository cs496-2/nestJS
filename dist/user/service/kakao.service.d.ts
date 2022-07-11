export declare class AlterService {
    getHello(): string;
    getStaticPathWithService: () => string;
    getDynamicPathWithservice(data: string): string;
}
export declare class MyService {
    data: string;
    getData(): string;
    setData(data: string): void;
}
export declare class KakaoLogin {
    check: boolean;
    accessToken: string;
    private http;
    constructor();
    loginCheck(): void;
    login(url: string, headers: any): Promise<any>;
    getUserInfo(url: string, headers: any): Promise<any>;
    setToken(token: string): boolean;
    logout(): Promise<any>;
    deleteLog(): Promise<any>;
}
