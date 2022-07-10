import { BaseEntity } from 'typeorm/index';
import { TravelSpend } from './TravelSpend';
import { TravelUserPair } from './TravelUserPair';
import { UserSpend } from './UserSpend';
export declare class Travel extends BaseEntity {
    travelId: number;
    travelName: string;
    travelCountry: string;
    startDate: Date;
    endDate: Date;
    foreignCurrency: string;
    coverImg: string;
    exchangeRate: number;
    totalSpend: number;
    mealSpend: number;
    shopSpend: number;
    tourSpend: number;
    transportSpend: number;
    hotelSpend: number;
    etcSpend: number;
    travelSpends: TravelSpend[];
    userSpends: UserSpend[];
    travelUserPairs: TravelUserPair[];
}
