import { User } from '.././domain/User';
import { Repository } from 'typeorm/index';
import { Travel } from '.././domain/Travel';
import { TravelSpend } from '.././domain/TravelSpend';
import { UserSpend } from '.././domain/UserSpend';
export declare class TravelService {
    private userRepository;
    private travelRepository;
    private travelUserPairRepository;
    private travelSpendRepository;
    private userSpendRepository;
    constructor(userRepository: Repository<User>, travelRepository: Repository<Travel>, travelUserPairRepository: Repository<User>, travelSpendRepository: Repository<TravelSpend>, userSpendRepository: Repository<UserSpend>);
    findAll(): Promise<Travel[]>;
    findOne(id: number): Promise<Travel>;
    saveTravel(travel: Travel): Promise<void>;
    deleteTravel(id: number): Promise<void>;
}
