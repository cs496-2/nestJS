import { BaseEntity } from 'typeorm/index';
import { Travel } from './Travel';
import { User } from './User';
export declare class UserSpend extends BaseEntity {
    userSpendId: number;
    travel: Travel;
    user: User;
    spendName: string;
    createdDate: Date;
    spendAmount: number;
    useWon: boolean;
    spendCategory: number;
}
