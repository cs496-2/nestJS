import { Body, ConsoleLogger, Controller, Delete, Get, Param, Post, Put, Res } from '@nestjs/common';
import { UserDto } from '../dto/user.dto';
import { UserService } from '../service/user.service';
// import { TestService } from '../test/test.service';
import { User } from '../domain/User';
import { TravelService } from '../service/travel.service';
import { Travel } from '../domain/Travel';
import { TravelUserPairService } from '../service/travelUserPair.service';
import { TravelUserPair } from '../domain/TravelUserPair';
import { RemoveOptions, SaveOptions } from 'typeorm';
import { validateToken } from 'src/auth';
import { TravelSpend } from '../domain/TravelSpend';
import { TravelSpendService } from '../service/travelSpend.service';
import { UserSpendService } from '../service/userSpend.service';
import { UserSpend } from '../domain/UserSpend';

@Controller('user/:userId')
export class TravelController {
  constructor(
    private travelService: TravelService,
    private travelUserPairService: TravelUserPairService,
    private userService: UserService,
    private travelSpendService: TravelSpendService,
    private userSpendService: UserSpendService
  ) {
    this.travelService = travelService;
    this.travelUserPairService =travelUserPairService;
    this.userService = userService;
    this.travelSpendService = travelSpendService;
    this.userSpendService = userSpendService;
  }


  /*Get All Travel List */
  @Get('travels')
  async findAllTravel(@Param('userId') userId: string): Promise<Travel[]> {
    validateToken();

    // console.log("for debug");
    // const testUser = await this.userService.findOne(userId);
    // console.log(testUser);
    // console.log("now printing user.traveluserpair");
    // console.log(testUser.travelUserPairs[0]);
    // console.log("debug end");


    // console.log("find All Travels...");
    const travelList : Travel[] = [];
    // const travelList = await this.travelService.findAll();
    const travelUserPairs = await this.travelUserPairService.findWithUserCondition(userId);
    // const travelList = await this.travelService.findOne(travelId);
    // console.log(`travel User Pairs are ... ${travelUserPairs}`);
    // console.log(`travelUserPairs[0] : ${travelUserPairs[0]}`);
    for (let i = 0 ; i < travelUserPairs.length;i++){
      const element = travelUserPairs[i];
      // console.log(`element : ${element}`);
      // console.log(element);
      // console.log(`element.user: ${element.user}`);
      // console.log(element.user);
      // console.log(`element.user.userId : ${element.user.userId}`);
      // console.log(`element.travel : ${element.travel}`);
      // console.log(`element.travel.travelId : ${element.travel.travelId}`);
      const addTravel :Travel = await this.travelService.findOne(element.travel.travelId);
      // console.log("THE FOUND TRAVEL IS BEING ADDED...");
      // console.log(addTravel);
      // console.log("TRAVEL LIST BEFORE PUSH");
      // console.log(travelList);
      travelList.push(addTravel);
      // console.log("TRAVEL LIST AFTER PUSH");
      // console.log(travelList);
    }
    // console.log("Hello World...");
    // console.log(travelList);
    // console.log(`all travels are.... ${travelList}`);
    const result = Object.assign({
      data: travelList,
      statusCode: 200,
      statusMsg: `데이터 조회가 성공적으로 완료되었습니다.`,
    });
    // console.log(result);
    return result; 
  }

  
  @Put('travels')
  async giveAllTravelWhenLogin(@Param('userId') userId: string): Promise<Travel[]> {
    validateToken();

    const user = await this.userService.findOne(userId);
    user.isActive = true;
    await this.userService.saveUser(user);

    return this.findAllTravel(userId);
  }
  
  /*Get Stats for Travel*/
  @Get(':travelId/stats')
  async getStats(@Param('travelId') travelId: number, @Param('userId') userId: string): Promise<string> {
    validateToken();
    const travelSpendList : TravelSpend[] = await this.travelSpendService.findWithTravelCondition(travelId);
    const userSpendList: UserSpend[] = await this.userSpendService.findWithUserTravelCondition(travelId, userId);
    
    // console.log(userList);
    return Object.assign({
      data: {
        travelSpendList,
        userSpendList
      },
      statusCode: 200,
      statusMsg: `데이터 조회가 성공적으로 완료되었습니다.`,
    });
  }

  @Get(':travelId/spends')
  async getSpend(@Param('userId') userId: string, @Param('travelId') travelId: string): Promise<Object>{
    validateToken();
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
  
  /* Travel Data CRUD Part*/
  @Get(':travelId')
  async getTravelData(@Param('travelId') travelId: number): Promise<string> {
    validateToken();
    const resultTravelData = await this.travelService.findOne(travelId);
    return Object.assign({
      data: resultTravelData,
      statusCode: 200,
      statusMsg: `데이터 조회가 성공적으로 완료되었습니다.`,
    });
  }

  @Post('travel')
  async postTravelData(@Body() travelData , @Param('userId') userId: string): Promise<Object> {
    validateToken();
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
    validateToken();
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
      statusMsg: `데이터 갱신이 성공적으로 완료되었습니다.`,
    });
  }
  @Delete(':travelId')
  async deleteTravelData(@Param('travelId') travelId: number, @Param('userId') userId: string): Promise<string> {
    validateToken();
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
  /* Travel Data CRUD Part End */
}

