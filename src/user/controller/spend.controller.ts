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

@Controller('user/:userId/:travelId')
export class SpendController {
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

  
  /*Get Stats for Travel*/
  @Get('stats')
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

  @Get('spends')
  async getSpendList(@Param('userId') userId: string, @Param('travelId') travelId: number): Promise<Object>{
    validateToken();
    const getUserSpendList = await this.userSpendService.findWithUserTravelCondition(travelId, userId);
    const getTravelSpendList = await this.travelSpendService.findWithTravelCondition(travelId)
    const resultData = {
      getUserSpendList,
      getTravelSpendList
    };
    return Object.assign({
      data: resultData,
      statusCode: 200,
      statusMsg: `데이터 조회가 성공적으로 완료되었습니다.`,
    });
  }

  /* Spend Data CRUD Park */
  @Post()
  async postSpend(@Param('userId') userId:string, @Param('travelId') travelId:number, @Body() body): Promise<string>{
    validateToken();
    let newSpend;
    if(body.isUserSpend){
      newSpend = new UserSpend();
      newSpend.travel = await this.travelService.findOne(travelId);
      newSpend.user = await this.userService.findOne(userId);
      newSpend.spendName = body.spendName;
      newSpend.createdDate = body.createdDate;
      newSpend.spendAmount = body.spendAmount;
      newSpend.useWon = body.useWon;
      newSpend.spendCategory = body.spendCategory;
      await this.userSpendService.saveUserSpend(newSpend);
      const addedSpendAmount = newSpend.spendAmount;
      const addedSpendCategory = newSpend.spendCategory;
      console.log(addedSpendAmount);
      console.log(addedSpendCategory);
      const updateTravelUserPair = await this.travelUserPairService.findWithUserTravelCondition(userId, travelId);
      updateTravelUserPair.personalTotalSpend += addedSpendAmount;
      switch(addedSpendCategory){
        case 0:
          updateTravelUserPair.personalMealSpend += addedSpendAmount;
          break;
        case 1:
          updateTravelUserPair.personalShopSpend += addedSpendAmount;
          break;
        case 2:
          updateTravelUserPair.personalTourSpend += addedSpendAmount;
          break;
        case 3:
          updateTravelUserPair.personalTransportSpend += addedSpendAmount;
          break;
        case 4:
          updateTravelUserPair.personalHotelSpend += addedSpendAmount;
          break;
        case 5:
          updateTravelUserPair.personalEtcSpend += addedSpendAmount;
          break;
      }
      await this.travelUserPairService.saveTravelUserPair(updateTravelUserPair);
    }else{
      newSpend = new TravelSpend();
      newSpend.travel = await this.travelService.findOne(travelId);
      newSpend.spendName = body.spendName;
      newSpend.createdDate = body.createdDate;
      newSpend.spendAmount = body.spendAmount;
      newSpend.useWon = body.useWon;
      newSpend.spendCategory = body.spendCategory;
      await this.travelSpendService.saveTravelSpend(newSpend);
      const addedSpendAmount = newSpend.spendAmount;
      const addedSpendCategory = newSpend.spendCategory;
      console.log(addedSpendAmount);
      console.log(addedSpendCategory);
      // 나중에 userId 와 travelId가 맞는지 검증 필요
      const updateTravel = await this.travelService.findOne(travelId);
      console.log(updateTravel);
      updateTravel.totalSpend += addedSpendAmount;
      switch(addedSpendCategory){
        case 0:
          updateTravel.mealSpend += addedSpendAmount;
          break;
        case 1:
          updateTravel.shopSpend += addedSpendAmount;
          break;
        case 2:
          updateTravel.tourSpend += addedSpendAmount;
          break;
        case 3:
          updateTravel.transportSpend += addedSpendAmount;
          break;
        case 4:
          updateTravel.hotelSpend += addedSpendAmount;
          break;
        case 5:
          updateTravel.etcSpend += addedSpendAmount;
          break;
      }
      await this.travelService.saveTravel(updateTravel);
    }
    const getUserSpendList = await this.userSpendService.findWithUserTravelCondition(travelId, userId);
    const getTravelSpendList = await this.travelSpendService.findWithTravelCondition(travelId)
    const resultData = {
      getUserSpendList,
      getTravelSpendList
    };
    return Object.assign({
      data:{
        newSpend,
        resultData
      },
      statusCode: 201,
      statusMsg: '데이터 삽입이 성공적으로 완료되었습니다.',
    })
  }
  @Get(':spendId')
  async getSpend(@Param('userId') userId:string, @Param('travelId') travelId:number, @Param('spendId') spendId:number, @Body() body): Promise<string>{
    validateToken();
    let getSpend;
    if(body.isUserSpend){
      //나중에 여기에 userId와 travelId와 spendId가 유효한지 검증하는 로직 필요
      getSpend = await this.userSpendService.findOne(spendId);
    }else{
      getSpend = await this.travelSpendService.findOne(spendId);
    }
    return Object.assign({
      data:{
        getSpend
      },
      statusCode: 200,
      statusMsg: '데이터 조회가 성공적으로 완료되었습니다.',
    })
  }
  @Put(':spendId')
  async putSpend(@Param('userId') userId:string, @Param('travelId') travelId:number, @Param('spendId') spendId: number, @Body() body): Promise<string>{
    validateToken();
    let updateSpend;
    if(body.isUserSpend){
      updateSpend = await this.userSpendService.findOne(spendId);
      const deletedSpendAmount = updateSpend.spendAmount;
      const deletedSpendCategory = updateSpend.spendCategory;
      updateSpend.spendName = body.spendName;
      updateSpend.createdDate = body.createdDate;
      updateSpend.spendAmount = body.spendAmount;
      updateSpend.useWon = body.useWon;
      updateSpend.spendCategory = body.spendCategory;
      await this.userSpendService.saveUserSpend(updateSpend);
      const addedSpendAmount = updateSpend.spendAmount;
      const addedSpendCategory = updateSpend.spendCategory;
      const updateTravelUserPair = await this.travelUserPairService.findWithUserTravelCondition(userId, travelId);
      updateTravelUserPair.personalTotalSpend -= deletedSpendAmount;
      switch(deletedSpendCategory){
        case 0:
          updateTravelUserPair.personalMealSpend -= deletedSpendAmount;
          break;
        case 1:
          updateTravelUserPair.personalShopSpend -= deletedSpendAmount;
          break;
        case 2:
          updateTravelUserPair.personalTourSpend -= deletedSpendAmount;
          break;
        case 3:
          updateTravelUserPair.personalTransportSpend -= deletedSpendAmount;
          break;
        case 4:
          updateTravelUserPair.personalHotelSpend -= deletedSpendAmount;
          break;
        case 5:
          updateTravelUserPair.personalEtcSpend -= deletedSpendAmount;
          break;
      }
      updateTravelUserPair.personalTotalSpend += addedSpendAmount;
      switch(addedSpendCategory){
        case 0:
          updateTravelUserPair.personalMealSpend += addedSpendAmount;
          break;
        case 1:
          updateTravelUserPair.personalShopSpend += addedSpendAmount;
          break;
        case 2:
          updateTravelUserPair.personalTourSpend += addedSpendAmount;
          break;
        case 3:
          updateTravelUserPair.personalTransportSpend += addedSpendAmount;
          break;
        case 4:
          updateTravelUserPair.personalHotelSpend += addedSpendAmount;
          break;
        case 5:
          updateTravelUserPair.personalEtcSpend += addedSpendAmount;
          break;
      }
      await this.travelUserPairService.saveTravelUserPair(updateTravelUserPair);
    }else{
      updateSpend = await this.travelSpendService.findOne(spendId);
      const deletedSpendAmount = updateSpend.spendAmount;
      const deletedSpendCategory = updateSpend.spendCategory;
      updateSpend.spendName = body.spendName;
      updateSpend.createdDate = body.createdDate;
      updateSpend.spendAmount = body.spendAmount;
      updateSpend.useWon = body.useWon;
      updateSpend.spendCategory = body.spendCategory;
      await this.travelSpendService.saveTravelSpend(updateSpend);
      const addedSpendAmount = updateSpend.spendAmount;
      const addedSpendCategory = updateSpend.spendCategory;
      const updateTravel = await this.travelService.findOne(travelId);
      updateTravel.totalSpend -= deletedSpendAmount;
      switch(deletedSpendCategory){
        case 0:
          updateTravel.mealSpend -= deletedSpendAmount;
          break;
        case 1:
          updateTravel.shopSpend -= deletedSpendAmount;
          break;
        case 2:
          updateTravel.tourSpend -= deletedSpendAmount;
          break;
        case 3:
          updateTravel.transportSpend -= deletedSpendAmount;
          break;
        case 4:
          updateTravel.hotelSpend -= deletedSpendAmount;
          break;
        case 5:
          updateTravel.etcSpend -= deletedSpendAmount;
          break;
      }
      updateTravel.totalSpend += addedSpendAmount;
      switch(addedSpendCategory){
        case 0:
          updateTravel.mealSpend += addedSpendAmount;
          break;
        case 1:
          updateTravel.shopSpend += addedSpendAmount;
          break;
        case 2:
          updateTravel.tourSpend += addedSpendAmount;
          break;
        case 3:
          updateTravel.transportSpend += addedSpendAmount;
          break;
        case 4:
          updateTravel.hotelSpend += addedSpendAmount;
          break;
        case 5:
          updateTravel.etcSpend += addedSpendAmount;
          break;
      }
      await this.travelService.saveTravel(updateTravel);
    }
    const getUserSpendList = await this.userSpendService.findWithUserTravelCondition(travelId, userId);
    const getTravelSpendList = await this.travelSpendService.findWithTravelCondition(travelId)
    const resultData = {
      getUserSpendList,
      getTravelSpendList
    };
    return Object.assign({
      data:{
        updateSpend,
        resultData
      },
      statusCode: 201,
      statusMsg: '데이터 수정이 성공적으로 완료되었습니다.',
    })
  }
  @Delete('delete/:spendId')
  async deleteSpend(@Param('userId') userId:string, @Param('travelId') travelId:number, @Param('spendId') spendId:number, @Body() body):Promise<string>{
    validateToken();
    if(body.isUserSpend){
      const deletedUserSpend = await this.userSpendService.findOne(spendId);
      const deletedSpendAmount = deletedUserSpend.spendAmount;
      const deletedSpendCategory = deletedUserSpend.spendCategory;
      await this.userSpendService.deleteUserSpend(spendId);
      const updateTravelUserPair = await this.travelUserPairService.findWithUserTravelCondition(userId, travelId);
      updateTravelUserPair.personalTotalSpend -= deletedSpendAmount;
      switch(deletedSpendCategory){
        case 0:
          updateTravelUserPair.personalMealSpend -= deletedSpendAmount;
          break;
        case 1:
          updateTravelUserPair.personalShopSpend -= deletedSpendAmount;
          break;
        case 2:
          updateTravelUserPair.personalTourSpend -= deletedSpendAmount;
          break;
        case 3:
          updateTravelUserPair.personalTransportSpend -= deletedSpendAmount;
          break;
        case 4:
          updateTravelUserPair.personalHotelSpend -= deletedSpendAmount;
          break;
        case 5:
          updateTravelUserPair.personalEtcSpend -= deletedSpendAmount;
          break;
      }
      await this.travelUserPairService.saveTravelUserPair(updateTravelUserPair);
    }else{
      const deletedTravelSpend = await this.travelSpendService.findOne(spendId);
      const deletedSpendAmount = deletedTravelSpend.spendAmount;
      const deletedSpendCategory = deletedTravelSpend.spendCategory;
      await this.travelSpendService.deleteTravelSpend(spendId);
      const updateTravel = await this.travelService.findOne(travelId);
      updateTravel.totalSpend -= deletedSpendAmount;
      switch(deletedSpendCategory){
        case 0:
          updateTravel.mealSpend -= deletedSpendAmount;
          break;
        case 1:
          updateTravel.shopSpend -= deletedSpendAmount;
          break;
        case 2:
          updateTravel.tourSpend -= deletedSpendAmount;
          break;
        case 3:
          updateTravel.transportSpend -= deletedSpendAmount;
          break;
        case 4:
          updateTravel.hotelSpend -= deletedSpendAmount;
          break;
        case 5:
          updateTravel.etcSpend -= deletedSpendAmount;
          break;
      }
      await this.travelService.saveTravel(updateTravel);
    }
    const getUserSpendList = await this.userSpendService.findWithUserTravelCondition(travelId, userId);
    const getTravelSpendList = await this.travelSpendService.findWithTravelCondition(travelId)
    const resultData = {
      getUserSpendList,
      getTravelSpendList
    };
    return Object.assign({
      data:{
        spendId,
        resultData
      },
      statusCode: 204,
      statusMsg: '데이터 제거가 성공적으로 완료되었습니다.'
    })
  }

  /* Spend Data CRUD Part End*/


}