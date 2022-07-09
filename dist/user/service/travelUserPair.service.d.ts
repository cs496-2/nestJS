import { User } from '../domain/User';
import { Repository } from 'typeorm/index';
import { Travel } from '../domain/Travel';
import { TravelUserPair } from '../domain/TravelUserPair';
import { TravelSpend } from '../domain/TravelSpend';
import { UserSpend } from '../domain/UserSpend';
export declare class TravelUserPairService {
    private userRepository;
    private travelRepository;
    private travelUserPairRepository;
    private travelSpendRepository;
    private userSpendRepository;
    constructor(userRepository: Repository<User>, travelRepository: Repository<Travel>, travelUserPairRepository: Repository<TravelUserPair>, travelSpendRepository: Repository<TravelSpend>, userSpendRepository: Repository<UserSpend>);
    findAll(): Promise<TravelUserPair[]>;
    findWithUserCondition(userId: string): Promise<TravelUserPair[]>;
    findOne(id: number): Promise<TravelUserPair>;
    saveTravelUserPair(travelUserPair: TravelUserPair): Promise<void>;
    deleteTravelUserPair(id: number): Promise<void>;
}
