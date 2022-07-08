import { UserDto } from './user/dto/user.dto';
import { UserService } from './user/user.service';
export declare class UserController {
    private userService;
    constructor(userService: UserService);
    findAll(): Promise<UserDto[]>;
    findOne(id: string): any | object;
    saveUser(userDto: UserDto): string;
}
