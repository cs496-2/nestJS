import { BaseEntity } from 'typeorm/index';
import { TravelUserPair } from './TravelUserPair';
import { UserSpend } from './UserSpend';
export declare class User extends BaseEntity {
    userId: string;
    userName: string;
    userPassword: string;
    age: number;
    isActive: boolean;
    userSpends: UserSpend[];
    travelUserPairs: TravelUserPair[];
}
