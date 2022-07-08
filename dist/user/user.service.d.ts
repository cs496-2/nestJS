import { User } from './domain/User';
import { Connection, Repository } from 'typeorm/index';
export declare class UserService {
    private userRepository;
    private connection;
    constructor(userRepository: Repository<User>, connection: Connection);
    findAll(): Promise<User[]>;
    findOne(id: string): Promise<User>;
    saveUser(user: User): Promise<void>;
    deleteUser(id: string): Promise<void>;
    createUsers(users: User[]): Promise<boolean>;
}
