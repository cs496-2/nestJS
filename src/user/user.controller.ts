import { Body, Controller, Delete, Get, Param, Post, Res } from '@nestjs/common';
import { UserDto } from './dto/user.dto';
import { UserService } from './user.service';
// import { TestService } from '../test/test.service';
import { User } from './domain/User';
@Controller('user')
export class UserController {
  constructor(
    private userService: UserService,
  ) {
    this.userService = userService;
  }
  // @Get('test')
  // findAnotherTest(): string {
  //   return this.testService.getInfo();
  // }
  @Get('list')
  async findAll(): Promise<User[]> {
    const userList = await this.userService.findAll();
    console.log(userList);
    return Object.assign({
      data: userList,
      statusCode: 200,
      statusMsg: `데이터 조회가 성공적으로 완료되었습니다.`,
    });
  }
  @Get(':userId')
  async findOne(@Param('userId') id: string): Promise<User> {
    const foundUser = await this.userService.findOne(id);
    return Object.assign({
      data: foundUser,
      statusCode: 200,
      statusMsg: `데이터 조회가 성공적으로 완료되었습니다.`,
    });
  }
  @Post()
  async saveUser(@Body() user: User): Promise<string> {
    // await this.userService.saveUser({ /* id: this.generateUserId(), */ ...user});
    await this.userService.saveUser(user);
    return Object.assign({
      data: { /* id: this.userKey,  */
        ...user },
      statusCode: 201,
      statusMsg: `saved successfully`,
    });
  }
  @Delete(':userId')
  async deleteUser(@Param('userId') id: string): Promise<string> {
    await this.userService.deleteUser(id);
    return Object.assign({
      data: { userId: id },
      statusCode: 201,
      statusMsg: `deleted successfully`,
    });
  }
}


// import { Body, Controller, Get, Param, Post, Res } from '@nestjs/common';
// import { UserDto } from './dto/user.dto';
// import { UserService } from './user.service';

// @Controller('user')
// export class UserController {
//   // @Get(':userId')
//   // findOne(@Param('userId') id: string): string {
//   //   return Object.assign({ id, userName: '이정주' });
//   // }

//   //Dependency Injection
//   constructor(private userService: UserService) {
//     this.userService = userService;
//   }



//   // @Get('list')
//   // findAll(): Promise<any[]> {
//   //   return new Promise((resolve) =>
//   //     setTimeout(
//   //       () => resolve([{ userName: '이정주' }, { userName: '김명일' }]),
//   //       100,
//   //     ),
//   //   );
//   // }

//   // @Get(':userId')
//   // findOne(@Param('userId') id: string, @Res() res): string {
//   //   // return res.status(200).send({ id, userName: '이정주', accountNum: 123 });
//   //   return res.status(200).send({ id, userName: '이정주', accountNum: 123 });
//   // }

//   // @Post()
//   // saveUser(@Body() payload): string {
//   //   return Object.assign({
//   //     statusCode: 201,
//   //     data: payload,
//   //     statusMsg: 'created successfully',
//   //   });
//   // }

//   // @Post()
//   // saveUser(@Body() userDto: UserDto): string {
//   //   return Object.assign({
//   //     data: { ...userDto },
//   //     statusCode: 201,
//   //     statusMsg: `saved successfully`,
//   //   });
//   // }

//   @Get('list')
//   findAll(): Promise<UserDto[]> {
//     return this.userService.findAll();
//   }
//   @Get(':userId')
//   findOne(@Param('userId') id: string): any | object {
//     return this.userService.findOne(id);
//   }
//   @Post()
//   saveUser(@Body() userDto: UserDto): string {
//     this.userService.saveUser(userDto);
//     return Object.assign({
//       data: { ...userDto },
//       statusCode: 201,
//       statusMsg: `saved successfully`,
//     });
//   }


// }
