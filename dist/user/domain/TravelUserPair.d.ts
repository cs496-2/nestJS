import { BaseEntity } from 'typeorm/index';
import { Travel } from './Travel';
import { User } from './User';
export declare class TravelUserPair extends BaseEntity {
    travelUserPairId: number;
    travel: Travel;
    user: User;
    personalTotalSpend: number;
    personalMealSpend: number;
    personalShopSpend: number;
    personalTourSpend: number;
    personalTransportSpend: number;
    personalHotelSpend: number;
    personalEtcSpend: number;
}
