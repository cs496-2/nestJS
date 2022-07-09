import { BaseEntity } from 'typeorm/index';
import { Photo } from './Photo';
import { TravelUserPair } from './TravelUserPair';
import { UserSpend } from './UserSpend';
export declare class User extends BaseEntity {
    userId: string;
    userName: string;
    userPassword: string;
    age: number;
    isActive: boolean;
    photos: Photo[];
    userSpends: UserSpend[];
    travelUserPairs: TravelUserPair[];
}
