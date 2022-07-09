import { User } from '../domain/User';
import { Repository } from 'typeorm/index';
import { Travel } from '../domain/Travel';
import { TravelSpend } from '../domain/TravelSpend';
import { UserSpend } from '../domain/UserSpend';
export declare class UserSpendService {
    private userRepository;
    private travelRepository;
    private travelUserPairRepository;
    private travelSpendRepository;
    private userSpendRepository;
    constructor(userRepository: Repository<User>, travelRepository: Repository<Travel>, travelUserPairRepository: Repository<User>, travelSpendRepository: Repository<TravelSpend>, userSpendRepository: Repository<UserSpend>);
    findAll(): Promise<UserSpend[]>;
    findWithUserTravelCondition(travelId: number, userId: string): Promise<UserSpend[]>;
    findOne(id: number): Promise<UserSpend>;
    saveUserSpend(userSpend: UserSpend): Promise<void>;
    deleteUserSpend(id: number): Promise<void>;
}
