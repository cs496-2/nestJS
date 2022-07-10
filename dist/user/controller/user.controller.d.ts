import { UserService } from '../service/user.service';
import { User } from '../domain/User';
import { TravelService } from '../service/travel.service';
export declare class UserController {
    private userService;
    private travelService;
    constructor(userService: UserService, travelService: TravelService);
    findAll(userId: string, body: any): Promise<User[]>;
    logout(userId: string, body: any): Promise<string>;
    findOne(id: string, body: any): Promise<User>;
    saveUser(user: User): Promise<string>;
    deleteUser(id: string, body: any): Promise<string>;
}
