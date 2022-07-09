import { UserService } from '../service/user.service';
import { User } from '../domain/User';
import { TravelService } from '../service/travel.service';
export declare class UserController {
    private userService;
    private travelService;
    constructor(userService: UserService, travelService: TravelService);
    findAll(): Promise<User[]>;
    logout(userId: string): Promise<string>;
    findOne(id: string): Promise<User>;
    saveUser(user: User): Promise<string>;
    deleteUser(id: string): Promise<string>;
}
