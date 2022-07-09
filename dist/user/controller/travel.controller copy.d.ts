import { UserService } from '../service/user.service';
import { User } from '../domain/User';
import { TravelService } from '../service/travel.service';
import { Travel } from '../domain/Travel';
import { TravelUserPairService } from '../service/travelUserPair.service';
import { TravelSpendService } from '../service/travelSpend.service';
import { UserSpendService } from '../service/userSpend.service';
export declare class TravelController {
    private travelService;
    private travelUserPairService;
    private userService;
    private travelSpendService;
    private userSpendService;
    constructor(travelService: TravelService, travelUserPairService: TravelUserPairService, userService: UserService, travelSpendService: TravelSpendService, userSpendService: UserSpendService);
    findAllTravel(userId: string): Promise<Travel[]>;
    giveAllTravelWhenLogin(userId: string): Promise<Travel[]>;
    getStats(travelId: number, userId: string): Promise<string>;
    getSpend(userId: string, travelId: string): Promise<Object>;
    getTravelData(travelId: number): Promise<string>;
    postTravelData(travelData: any, userId: string): Promise<Object>;
    putTravelData(travelId: number, userId: string, travelData: any): Promise<string>;
    deleteTravelData(travelId: number, userId: string): Promise<string>;
    findOne(id: string): Promise<User>;
    saveUser(user: User): Promise<string>;
    deleteUser(id: string): Promise<string>;
}
