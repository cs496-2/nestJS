import { BaseEntity } from 'typeorm/index';
import { Travel } from './Travel';
export declare class Schedule extends BaseEntity {
    scheduleId: number;
    scheduleName: string;
    date: string;
    time: string;
    location: string;
    locationX: number;
    locationY: number;
    travel: Travel;
}
