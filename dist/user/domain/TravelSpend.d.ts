import { BaseEntity } from 'typeorm/index';
import { Travel } from './Travel';
export declare class TravelSpend extends BaseEntity {
    travelSpendId: number;
    travel: Travel;
    spendName: string;
    createdDate: Date;
    spendAmount: number;
    useWon: boolean;
    spendCategory: number;
}
