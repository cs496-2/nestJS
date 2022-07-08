import { BaseEntity } from 'typeorm/index';
import { Photo } from './Photo';
export declare class User extends BaseEntity {
    id: number;
    userId: string;
    userName: string;
    userPassword: string;
    age: number;
    isActive: boolean;
    photos: Photo[];
}
