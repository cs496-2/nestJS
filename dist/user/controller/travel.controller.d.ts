import { UserService } from '../service/user.service';
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
    addUserToTravel(userId: string, travelId: number, addedUserId: string): Promise<Travel[]>;
    deleteUserFromTravel(userId: string, travelId: number, deletedUserId: string): Promise<Travel[]>;
    getTravelData(travelId: number): Promise<string>;
    postTravelData(travelData: any, userId: string): Promise<Object>;
    putTravelData(travelId: number, userId: string, travelData: any): Promise<string>;
    deleteTravelData(travelId: number, userId: string): Promise<string>;
}
