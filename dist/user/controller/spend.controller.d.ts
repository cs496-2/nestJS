import { UserService } from '../service/user.service';
import { TravelService } from '../service/travel.service';
import { TravelUserPairService } from '../service/travelUserPair.service';
import { TravelSpendService } from '../service/travelSpend.service';
import { UserSpendService } from '../service/userSpend.service';
export declare class SpendController {
    private travelService;
    private travelUserPairService;
    private userService;
    private travelSpendService;
    private userSpendService;
    constructor(travelService: TravelService, travelUserPairService: TravelUserPairService, userService: UserService, travelSpendService: TravelSpendService, userSpendService: UserSpendService);
    getStats(travelId: number, userId: string): Promise<string>;
    getSpendList(userId: string, travelId: number): Promise<Object>;
    postSpend(userId: string, travelId: number, body: any): Promise<string>;
    getSpend(userId: string, travelId: number, spendId: number, body: any): Promise<string>;
    putSpend(userId: string, travelId: number, spendId: number, body: any): Promise<string>;
    deleteSpend(userId: string, travelId: number, spendId: number, body: any): Promise<string>;
}
