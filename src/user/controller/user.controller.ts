import { Body, Controller, Delete, Get, Param, Post, Put, Res } from '@nestjs/common';
import { UserDto } from '../dto/user.dto';
import { UserService } from '../service/user.service';
// import { TestService } from '../test/test.service';
import { User } from '../domain/User';
import { TravelService } from '../service/travel.service';
import { Travel } from '../domain/Travel';
import { validateToken } from 'src/auth';
@Controller('user')
export class UserController {
  constructor(
    private userService: UserService,
    private travelService: TravelService,
  ) {
    this.userService = userService;
    this.travelService = travelService;
  }
  // @Get('test')
  // findAnotherTest(): string {
  //   return this.testService.getInfo();
  // }


  @Get('list/:userId')
  async findAll(@Param('userId') userId:string, @Body() body): Promise<User[]> {
    validateToken(userId, body.token);
    const userList = await this.userService.findAll();
    console.log(userList);
    return Object.assign({
      data: userList,
      statusCode: 200,
      statusMsg: `데이터 조회가 성공적으로 완료되었습니다.`,
    });
  }
  @Put(':userId/logout')
  async logout(@Param('userId') userId: string, @Body() body): Promise<string>{
    validateToken(userId, body.token);
    const user = await this.userService.findOne(userId);
    user.isActive = false;
    await this.userService.saveUser(user);

    return Object.assign({
      data: {
        userId,
      },
      statusCode: 204,
      statusMsg: '데이터 갱신이 성공적으로 완료되었습니다.',
    })
  }
  @Get(':userId')
  async findOne(@Param('userId') id: string, @Body() body): Promise<User> {
    validateToken(id, body.token);
    const foundUser = await this.userService.findOne(id);
    return Object.assign({
      data: foundUser,
      statusCode: 200,
      statusMsg: `데이터 조회가 성공적으로 완료되었습니다.`,
    });
  }
  @Post()
  async saveUser(@Body() user: User): Promise<string> {
    // validateToken(user.userId, user.token);
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
  async deleteUser(@Param('userId') id: string, @Body() body): Promise<string> {
    validateToken(id, body.token);
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
