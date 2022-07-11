import { User } from '../domain/User';
import { Repository } from 'typeorm/index';
import { Travel } from '../domain/Travel';
import { TravelSpend } from '../domain/TravelSpend';
import { UserSpend } from '../domain/UserSpend';
import { Schedule } from '../domain/Schedule';
export declare class ScheduleService {
    private userRepository;
    private travelRepository;
    private travelUserPairRepository;
    private travelSpendRepository;
    private userSpendRepository;
    private scheduleRepository;
    constructor(userRepository: Repository<User>, travelRepository: Repository<Travel>, travelUserPairRepository: Repository<User>, travelSpendRepository: Repository<TravelSpend>, userSpendRepository: Repository<UserSpend>, scheduleRepository: Repository<Schedule>);
    findAll(): Promise<Schedule[]>;
    findOne(id: number): Promise<Schedule>;
    findWithTravelCondition(travelId: number): Promise<Schedule[]>;
    findWithTravelDateCondition(travelId: number, date: string): Promise<Schedule[]>;
    saveSchedule(schedule: Schedule): Promise<void>;
    deleteSchedule(id: number): Promise<void>;
}
