import { Body, Controller, Delete, Get, Param, Post, Put, Res } from '@nestjs/common';
import { UserDto } from '../dto/user.dto';
import { UserService } from '../service/user.service';
// import { TestService } from '../test/test.service';
import { User } from '../domain/User';
import { TravelService } from '../service/travel.service';
import { Travel } from '../domain/Travel';
import { TravelUserPairService } from '../service/travelUserPair.service';
import { TravelUserPair } from '../domain/TravelUserPair';
import { RemoveOptions, SaveOptions } from 'typeorm';

@Controller('user/:userId')
export class TravelController {
  constructor(
    private travelService: TravelService,
    private travelUserPairService: TravelUserPairService,
    private userService: UserService,
  ) {
    this.travelService = travelService;
    this.travelUserPairService =travelUserPairService;
    this.userService = userService;
  }

  //methods//
  @Get(':travelId')
  async getTravelData(@Param('travelId') travelId: number): Promise<string> {
    const resultTravelData = await this.travelService.findOne(travelId);
    return Object.assign({
      data: resultTravelData,
      statusCode: 200,
      statusMsg: `데이터 조회가 성공적으로 완료되었습니다.`,
    });
  }

  //travelDataPostPart
  @Post('travel')
  async postTravelData(@Body() travelData , @Param('userId') userId: string): Promise<Object> {
    /*create new Travel*/
    const newTravel : Travel = new Travel();
    newTravel.travelName = travelData.travelName;
    newTravel.travelCountry = travelData.travelCountry;
    newTravel.startDate = travelData.startDate;
    newTravel.endDate = travelData.endDate;
    newTravel.foreignCurrency = travelData.foreignCurrency;
    newTravel.coverImg = travelData.coverImg;
    newTravel.totalSpend = 0;
    newTravel.mealSpend = 0;
    newTravel.shopSpend = 0;
    newTravel.tourSpend = 0;
    newTravel.transportSpend = 0;
    newTravel.hotelSpend = 0;
    newTravel.etcSpend = 0;
    await this.travelService.saveTravel(newTravel);
    // console.log(travelData);

    /*create new TravelUserPair*/
    const user : User = await this.userService.findOne(userId);
    const newTravelUserPair : TravelUserPair = new TravelUserPair();
    newTravelUserPair.travel = newTravel;
    newTravelUserPair.user = user;
    newTravelUserPair.personalTotalSpend = 0;
    newTravelUserPair.personalMealSpend = 0;
    newTravelUserPair.personalShopSpend = 0;
    newTravelUserPair.personalTourSpend = 0;
    newTravelUserPair.personalTransportSpend = 0;
    newTravelUserPair.personalHotelSpend = 0;
    newTravelUserPair.personalEtcSpend = 0;
    await this.travelUserPairService.saveTravelUserPair(newTravelUserPair);

    /*check the relationship between Travel / User / TravelUserPair */
    // const userInfo = await (await this.userService.findOne(userId)).travelUserPairs;
    // const travelInfo = await (await this.travelService.findOne(newTravel.travelId)).travelUserPairs;
    // console.log(userInfo);
    // console.log(travelInfo);

    /*return result*/
    return Object.assign({
      data: {newTravel,
        newTravelUserPair,},
      statusCode: 201,
      statusMsg: `데이터 추가가 성공적으로 완료되었습니다.`,
    });
  }

  @Put(':travelId')
  async putTravelData(@Param('travelId') travelId: number, @Param('userId') userId: string, @Body() travelData): Promise<string> {
    const updateTravel = await this.travelService.findOne(travelId);
    updateTravel.travelName = travelData.travelName;
    updateTravel.travelCountry = travelData.travelCountry;
    updateTravel.startDate = travelData.startDate;
    updateTravel.endDate = travelData.endDate;
    updateTravel.foreignCurrency = travelData.foreignCurrency;
    updateTravel.coverImg = travelData.coverImg;

    await this.travelService.saveTravel(updateTravel);
    
    // console.log(userList);
    return Object.assign({
      data: updateTravel,
      statusCode: 201,
      statusMsg: `데이터 수정가 성공적으로 완료되었습니다.`,
    });
  }
  @Delete(':travelId')
  async deleteTravelData(@Param('travelId') travelId: number, @Param('userId') userId: string): Promise<string> {
    // const userList = await this.userService.findAll();
    // const testvalue : string = travelId + userId;
    
    // console.log(userList);
    // const deletedTravel = await this.travelService.findOne(travelId);
    await this.travelService.deleteTravel(travelId);
    return Object.assign({
      data: {
        travelId,
        // deletedTravel
      },
      statusCode: 204,
      statusMsg: `데이터 삭제가 성공적으로 완료되었습니다.`,
    });
  }




  @Get(':travelId/stats')
  async getStats(@Param('travelId') travelId: string, @Param('userId') userId: string): Promise<string> {
    // const userList = await this.userService.findAll();
    const testvalue : string = travelId + userId;
    
    // console.log(userList);
    return Object.assign({
      data: testvalue,
      statusCode: 200,
      statusMsg: `데이터 조회가 성공적으로 완료되었습니다.`,
    });
  }

  @Get(':travelId/spends')
  async getSpend(@Param('userId') userId: string, @Param('travelId') travelId: string): Promise<Object>{
    const testResultData = {
      travelSpend: [`testResultData with travelId : ${travelId}`],
      userSpend: [`userSpendTestValue with userId : ${userId}`]
    };
    return Object.assign({
      data: testResultData,
      statusCode: 200,
      statusMsg: `데이터 조회가 성공적으로 완료되었습니다.`,
    });
  }

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
