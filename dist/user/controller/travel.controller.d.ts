import { UserService } from '../service/user.service';
import { User } from '../domain/User';
import { TravelService } from '../service/travel.service';
import { TravelUserPairService } from '../service/travelUserPair.service';
export declare class TravelController {
    private travelService;
    private travelUserPairService;
    private userService;
    constructor(travelService: TravelService, travelUserPairService: TravelUserPairService, userService: UserService);
    getTravelData(travelId: number): Promise<string>;
    postTravelData(travelData: any, userId: string): Promise<Object>;
    putTravelData(travelId: number, userId: string, travelData: any): Promise<string>;
    deleteTravelData(travelId: number, userId: string): Promise<string>;
    getStats(travelId: string, userId: string): Promise<string>;
    getSpend(userId: string, travelId: string): Promise<Object>;
    findAll(): Promise<User[]>;
    findOne(id: string): Promise<User>;
    saveUser(user: User): Promise<string>;
    deleteUser(id: string): Promise<string>;
}
