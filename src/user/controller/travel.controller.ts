import { Body, ConsoleLogger, Controller, Delete, Get, Param, Post, Put, Req, Res } from '@nestjs/common';
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
import { Schedule } from '../domain/Schedule';
import { ScheduleService } from '../service/schedule.service';

@Controller('user/:userId')
export class TravelController {
  constructor(
    private travelService: TravelService,
    private travelUserPairService: TravelUserPairService,
    private userService: UserService,
    private travelSpendService: TravelSpendService,
    private userSpendService: UserSpendService,
    private scheduleService: ScheduleService
  ) {
    this.travelService = travelService;
    this.travelUserPairService =travelUserPairService;
    this.userService = userService;
    this.travelSpendService = travelSpendService;
    this.userSpendService = userSpendService;
    this.scheduleService = scheduleService;
  }

    /*Get Travel's All Schedule List */
    @Get(':travelId/schedule/list')//유저의 여행 정보 리스트를 get하는 request
    async findAllSchedule(@Param('userId') userId: string,@Param('travelId') travelId : number, @Body() body): Promise<Schedule[]> {
      validateToken(userId, body.token);
      const scheduleList: Schedule[] = await this.scheduleService.findWithTravelCondition(travelId);
      const returnScheduleList = scheduleList.sort((a, b)=>(( ( new Date(a.date+a.time) ) > ( new Date(b.date+b.time) ) )?1:-1));
      const result = Object.assign({
        data: returnScheduleList,
        statusCode: 200,
        statusMsg: `데이터 조회가 성공적으로 완료되었습니다.`,
      });
      return result; 
    }

    /*Get Travel's Specific Date's Schedule List */
    @Get(':travelId/schedule/list/:date')//유저의 여행 정보 리스트를 get하는 request
    async findDateSchedule(@Param('userId') userId: string,@Param('travelId') travelId : number, @Param('date')date : string,  @Body() body): Promise<Schedule[]> {
      validateToken(userId, body.token);
      const scheduleList: Schedule[] = await this.scheduleService.findWithTravelDateCondition(travelId, date);
      const returnScheduleList = scheduleList.sort((a, b)=>(( ( new Date(a.date+a.time) ) > ( new Date(b.date+b.time) ) )?1:-1));
      const result = Object.assign({
        data: returnScheduleList,
        statusCode: 200,
        statusMsg: `데이터 조회가 성공적으로 완료되었습니다.`,
      });
      return result; 
    }

    /*Get Travel's All Schedule List */
    @Post(':travelId/schedule')//유저의 여행 정보 리스트를 get하는 request
    async postSchedule(@Param('userId') userId: string,@Param('travelId') travelId : number, @Body() body): Promise<Schedule[]> {
      validateToken(userId, body.token);
      const newSchedule = new Schedule();
      newSchedule.travel = await this.travelService.findOne(travelId);
      newSchedule.scheduleName = body.scheduleName;
      // console.log(body.scheduleName);
      // console.log(body.date);
      // console.log(body.time);
      // console.log(`${body.date} ${body.time}`);
      const scheduleDate = new Date(`${body.date} ${body.time}`);
      // console.log(scheduleDate);
      // console.log(scheduleDate.toLocaleDateString());
      newSchedule.date = scheduleDate.toLocaleDateString();
      // console.log(scheduleDate.toTimeString());
      newSchedule.time = scheduleDate.toTimeString().substr(0,8);
      newSchedule.location = body.location;
      newSchedule.locationX = body.locationX;
      newSchedule.locationY = body.locationY;
      // console.log(newSchedule);
      // console.log(newSchedule.scheduleId);
      await this.scheduleService.saveSchedule(newSchedule);
      //일정 추가 후 일정 목록 화면으로 리디렉션
      const scheduleList: Schedule[] = await this.scheduleService.findWithTravelCondition(travelId);
      const returnScheduleList = scheduleList.sort((a, b)=>(( ( new Date(a.date+a.time) ) > ( new Date(b.date+b.time) ) )?1:-1));
      const result = Object.assign({
        data: returnScheduleList,
        statusCode: 201,
        statusMsg: `데이터 추가가 성공적으로 완료되었습니다.`,
      });
      return result; 
    }

    /*Get Travel's All Schedule List */
    @Delete(':travelId/schedule/:scheduleId')//유저의 여행 정보 리스트를 get하는 request
    async deleteSchedule(@Param('userId') userId: string,@Param('travelId') travelId : number,@Param('scheduleId') scheduleId : number, @Body() body): Promise<Schedule[]> {
      validateToken(userId, body.token);
      await this.scheduleService.deleteSchedule(scheduleId);

      //일정 삭제 후 일정 목록 화면으로 리디렉션
      const scheduleList: Schedule[] = await this.scheduleService.findWithTravelCondition(travelId);
      const returnScheduleList = scheduleList.sort((a, b)=>(( ( new Date(a.date+a.time) ) > ( new Date(b.date+b.time) ) )?1:-1));
      const result = Object.assign({
        data: returnScheduleList,
        statusCode: 204,
        statusMsg: `데이터 삭제가 성공적으로 완료되었습니다.`,
      });
      return result; 
    }


  /*Get All Travel List */
  @Get('travels')//유저의 여행 정보 리스트를 get하는 request
  async findAllTravel(@Param('userId') userId: string, @Body() body): Promise<Travel[]> {
    validateToken(userId, body.token);
    const travelList : Travel[] = [];
    const travelUserPairs = await this.travelUserPairService.findWithUserCondition(userId);
    for (let i = 0 ; i < travelUserPairs.length;i++){
      const element = travelUserPairs[i];
      const addTravel :Travel = await this.travelService.findOne(element.travel.travelId);
      travelList.push(addTravel);
    }
    const result = Object.assign({
      data: travelList,
      statusCode: 200,
      statusMsg: `데이터 조회가 성공적으로 완료되었습니다.`,
    });
    return result; 
  }

  
  @Put('travels') //travel 정보 put이 아니라, 로그인 하면 isActive를 put, 그리고 유저의 여행 정보 리스트를 get하는 request
  async giveAllTravelWhenLogin(@Param('userId') userId: string, @Body() body): Promise<Travel[]> {
    console.log(body);
    validateToken(userId, body.token);

    if(await this.userService.findOne(body.userId) == null){
      const newUser = new User();
      newUser.userId = body.userId;
      newUser.userName = body.userName;
      newUser.userPassword = body.userPassword;
      newUser.age = body.age;
      newUser.isActive = body.isActive;
      await this.userService.saveUser(newUser);
    }else{
      const user = await this.userService.findOne(userId);
      user.isActive = true;
      await this.userService.saveUser(user);

    }

    return this.findAllTravel(userId, body);
  }

  
  @Post(':travelId/:addedUserId') //travel에 참여하는 유저를 추가하는 request
  async addUserToTravel(@Param('userId') userId: string, @Param('travelId') travelId: number, @Param('addedUserId') addedUserId: string, @Body() body): Promise<Travel[]> {
    validateToken(userId, body.token);
    const addedUser : User = await this.userService.findOne(addedUserId);
    const addedTravel : Travel = await this.travelService.findOne(travelId);
    const addedTravelUserPair : TravelUserPair = new TravelUserPair();
    addedTravelUserPair.travel = addedTravel;
    addedTravelUserPair.user = addedUser;
    addedTravelUserPair.personalTotalSpend = 0;
    addedTravelUserPair.personalMealSpend = 0;
    addedTravelUserPair.personalShopSpend = 0;
    addedTravelUserPair.personalTourSpend = 0;
    addedTravelUserPair.personalTransportSpend = 0;
    addedTravelUserPair.personalHotelSpend = 0;
    addedTravelUserPair.personalEtcSpend = 0;
    await this.travelUserPairService.saveTravelUserPair(addedTravelUserPair);

    return this.findAllTravel(userId, body);
  }
  
  @Delete(':travelId/:deletedUserId') //travel에 참여하는 유저를 제거하는 request
  async deleteUserFromTravel(@Param('userId') userId: string, @Param('travelId') travelId: number, @Param('deletedUserId') deletedUserId: string, @Body() body): Promise<Travel[]> {
    validateToken(userId, body.token);
    const deletedTravelUserPair : TravelUserPair = await this.travelUserPairService.findWithUserTravelCondition(deletedUserId, travelId);
    await this.travelUserPairService.deleteTravelUserPair(deletedTravelUserPair.travelUserPairId);

    return this.findAllTravel(userId, body);
  }
  


  /* Travel Data CRUD Part*/
  @Get(':travelId')
  async getTravelData(@Param('travelId') travelId: number, @Param('userId') userId:string, @Body() body): Promise<string> {
    console.log('travel Detail Info requested');
    validateToken(userId, body.token);
    const resultTravelData = await this.travelService.findOne(travelId);
    const joinedUserList = await this.travelUserPairService.findWithTravelCondition(travelId);
    
    return Object.assign({
      data: {
        resultTravelData,
        joinedUserList
      },
      statusCode: 200,
      statusMsg: `데이터 조회가 성공적으로 완료되었습니다.`,
    });
  }

  @Post('travel')
  async postTravelData(@Body() travelData , @Param('userId') userId: string): Promise<Object> {
    validateToken(userId, travelData.token);
    /*create new Travel*/
    const newTravel : Travel = new Travel();
    newTravel.travelName = travelData.travelName;
    newTravel.travelCountry = travelData.travelCountry;
    newTravel.startDate = new Date(travelData.startDate);
    newTravel.endDate = new Date(travelData.endDate);
    newTravel.foreignCurrency = travelData.foreignCurrency;
    newTravel.coverImg = travelData.coverImg;
    newTravel.exchangeRate = travelData.exchangeRate;
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
    validateToken(userId, travelData.token);
    const updateTravel = await this.travelService.findOne(travelId);
    updateTravel.travelName = travelData.travelName;
    updateTravel.travelCountry = travelData.travelCountry;
    updateTravel.startDate = new Date(travelData.startDate);
    updateTravel.endDate = new Date(travelData.endDate);
    updateTravel.foreignCurrency = travelData.foreignCurrency;
    updateTravel.coverImg = travelData.coverImg;
    updateTravel.exchangeRate = travelData.exchangeRate;

    await this.travelService.saveTravel(updateTravel);
    
    // console.log(userList);
    return Object.assign({
      data: updateTravel,
      statusCode: 201,
      statusMsg: `데이터 갱신이 성공적으로 완료되었습니다.`,
    });
  }
  @Delete(':travelId')
  async deleteTravelData(@Param('travelId') travelId: number, @Param('userId') userId: string, @Body() body): Promise<string> {
    validateToken(userId, body.token);
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

