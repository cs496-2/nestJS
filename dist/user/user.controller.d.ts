import { UserService } from './user.service';
import { User } from './domain/User';
export declare class UserController {
    private userService;
    constructor(userService: UserService);
    findAll(): Promise<User[]>;
    findOne(id: string): Promise<User>;
    saveUser(user: User): Promise<string>;
    deleteUser(id: string): Promise<string>;
}
