 import { Body, ConsoleLogger, Controller, Delete, Get, Param, Post, Put, Res } from '@nestjs/common';
import { UserDto } from '../dto/user.dto';
import { UserService } from '../service/user.service';
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
  async getStats(@Param('travelId') travelId: number, @Param('userId') userId: string, @Body() body): Promise<Object> {
    validateToken(userId, body.token);
    // const travelSpendList : TravelSpend[] = await this.travelSpendService.findWithTravelCondition(travelId);
    // const userSpendList: UserSpend[] = await this.userSpendService.findWithUserTravelCondition(travelId, userId);
    
    // //travelspendlist와 userspendlist 를 검색 후 합쳐서 반환
    // return Object.assign({
    //   data: {
    //     travelSpendList,
    //     userSpendList
    //   },
    //   statusCode: 200,
    //   statusMsg: `데이터 조회가 성공적으로 완료되었습니다.`,
    // });
    const travelForStat : Travel = await this.travelService.findOne(travelId);
    const travelUserPairForStat: TravelUserPair = await this.travelUserPairService.findWithUserTravelCondition(userId, travelId);
    
    //travelspendlist와 userspendlist 를 검색 후 합쳐서 반환
    return Object.assign({
      data: {
        travelForStat,
        travelUserPairForStat
      },
      statusCode: 200,
      statusMsg: `데이터 조회가 성공적으로 완료되었습니다.`,
    });
  }

  @Get('spends')
  async getSpendList(@Param('userId') userId: string, @Param('travelId') travelId: number, @Body() body): Promise<Object>{
    validateToken(userId, body.token);
    const getUserSpendList = await this.userSpendService.findWithUserTravelCondition(travelId, userId);
    const getTravelSpendList = await this.travelSpendService.findWithTravelCondition(travelId);

    //받아온 userspendlist와 travelspendlist를 병합, date 순으로 sort 후 반환
    const resultData = [
      ...getUserSpendList,
      ...getTravelSpendList
    ];
    resultData.sort((a, b) => (a.createdDate > b.createdDate)?  1: -1);

    return Object.assign({
      data: resultData,
      statusCode: 200,
      statusMsg: `데이터 조회가 성공적으로 완료되었습니다.`,
    });
  }

  /* Spend Data CRUD Park */
  @Post()
  async postSpend(@Param('userId') userId:string, @Param('travelId') travelId:number, @Body() body): Promise<string>{
    validateToken(userId, body.token);

    let newSpend;

    //userspend인지 여부에 확인 후 저장
    if(body.isUserSpend){
      //새 userspend entity 생성
      newSpend = new UserSpend();
      newSpend.travel = await this.travelService.findOne(travelId);
      newSpend.user = await this.userService.findOne(userId);
      newSpend.spendName = body.spendName;
      newSpend.createdDate = new Date(body.createdDate);
      newSpend.spendAmount = body.spendAmount;
      newSpend.useWon = body.useWon;
      newSpend.spendCategory = body.spendCategory;
      //새 entity 저장
      await this.userSpendService.saveUserSpend(newSpend);
      let addedSpendAmount: number;
      if(newSpend.useWon){  //원화 쓰는지 여부에 따른 소비량 갱신
        addedSpendAmount = newSpend.spendAmount * 1;;
      }else{
        addedSpendAmount = newSpend.spendAmount * newSpend.travel.exchangeRate;
      }
      const addedSpendCategory = newSpend.spendCategory;
      const updateTravelUserPair = await this.travelUserPairService.findWithUserTravelCondition(userId, travelId);
      //유저의 개인지출을 갱신
      updateTravelUserPair.personalTotalSpend = updateTravelUserPair.personalTotalSpend + addedSpendAmount;
      switch(addedSpendCategory){
        case 0:
          updateTravelUserPair.personalMealSpend = updateTravelUserPair.personalMealSpend + addedSpendAmount;
          break;
        case 1:
          updateTravelUserPair.personalShopSpend = updateTravelUserPair.personalShopSpend + addedSpendAmount;
          break;
        case 2:
          updateTravelUserPair.personalTourSpend = updateTravelUserPair.personalTourSpend + addedSpendAmount;
          break;
        case 3:
          updateTravelUserPair.personalTransportSpend = updateTravelUserPair.personalTransportSpend + addedSpendAmount;
          break;
        case 4:
          updateTravelUserPair.personalHotelSpend = updateTravelUserPair.personalHotelSpend + addedSpendAmount;
          break;
        case 5:
          updateTravelUserPair.personalEtcSpend = updateTravelUserPair.personalEtcSpend + addedSpendAmount;
          break;
      }
      await this.travelUserPairService.saveTravelUserPair(updateTravelUserPair);
    }else{
      newSpend = new TravelSpend();
      newSpend.travel = await this.travelService.findOne(travelId);
      newSpend.spendName = body.spendName;
      newSpend.createdDate = new Date(body.createdDate);
      newSpend.spendAmount = body.spendAmount;
      newSpend.useWon = body.useWon;
      newSpend.spendCategory = body.spendCategory;
      await this.travelSpendService.saveTravelSpend(newSpend);
      let addedSpendAmount;
      if(newSpend.useWon){ //원화 쓰는지 여부에 따른 소비량 갱신
        addedSpendAmount = newSpend.spendAmount * 1;;
      }else{
        addedSpendAmount = newSpend.spendAmount * newSpend.travel.exchangeRate;
      }
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
    
    //유저의 개인지출 갱신 이후, 지출 목록으로 돌아가기 위해 개인지출/공동지출목록 반환
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
    validateToken(userId, body.token);
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
    validateToken(userId, body.token);
    let updateSpend;
    if(body.isUserSpend){
      //갱신할 지출 불러오기
      updateSpend = await this.userSpendService.findOne(spendId);
      //차감할 기존 지출 내역 정보 저장
      let deletedSpendAmount;
      if(updateSpend.useWon){ //원화 쓰는지 여부에 따른 소비량 갱신
        deletedSpendAmount = updateSpend.spendAmount;
      }else{
        deletedSpendAmount = updateSpend.spendAmount * (await this.travelService.findOne(updateSpend.travel.travelId)).exchangeRate;
      }
      const deletedSpendCategory = updateSpend.spendCategory;
      //갱신할 지출의 정보 갱신 후 저장
      updateSpend.spendName = body.spendName;
      updateSpend.createdDate = new Date(body.createdDate);
      updateSpend.spendAmount = body.spendAmount;
      updateSpend.useWon = body.useWon;
      updateSpend.spendCategory = body.spendCategory;
      await this.userSpendService.saveUserSpend(updateSpend);

      //기존 지출금액과 카테고리만큼 유저 개인지출에서 차감
      let addedSpendAmount;
      if(updateSpend.useWon){ //원화 쓰는지 여부에 따른 소비량 갱신
        addedSpendAmount = updateSpend.spendAmount;
      }else{
        addedSpendAmount = updateSpend.spendAmount * (await this.travelService.findOne(updateSpend.travel.travelId)).exchangeRate;
      }
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
      //새로운 지출금액과 지출분류 고려하여 유저 개인지출에서 추가
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
      let deletedSpendAmount;
      if(updateSpend.useWon){ //원화 쓰는지 여부에 따른 소비량 갱신
        deletedSpendAmount = updateSpend.spendAmount;
      }else{
        deletedSpendAmount = updateSpend.spendAmount * (await this.travelService.findOne(updateSpend.travel.travelId)).exchangeRate;
      }
      const deletedSpendCategory = updateSpend.spendCategory;
      updateSpend.spendName = body.spendName;
      updateSpend.createdDate = new Date(body.createdDate);
      updateSpend.spendAmount = body.spendAmount;
      updateSpend.useWon = body.useWon;
      updateSpend.spendCategory = body.spendCategory;
      await this.travelSpendService.saveTravelSpend(updateSpend);
      let addedSpendAmount;
      if(updateSpend.useWon){ //원화 쓰는지 여부에 따른 소비량 갱신
        addedSpendAmount = updateSpend.spendAmount;
      }else{
        addedSpendAmount = updateSpend.spendAmount * (await this.travelService.findOne(updateSpend.travel.travelId)).exchangeRate;
      }
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

    //지출 갱신 완료 후 지출목록으로 돌아가기 위한 개인/공동지출목록 반환
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

  @Delete('delete/:spendId/:isUserSpend')
  async deleteSpend(@Param('userId') userId:string, @Param('travelId') travelId:number, @Param('spendId') spendId:number, @Body() body, @Param('isUserSpend') isUserSpend: string):Promise<string>{
    validateToken(userId, body.token);
    console.log(`isUserSpend??? : ${isUserSpend}\n type of isUserSpend??? : ${typeof isUserSpend}`);
    if(isUserSpend == 'true'){
      //제거할 userspend 불러오기
      const deletedUserSpend = await this.userSpendService.findOne(spendId);
      console.log(deletedUserSpend);
      //제거할 개인지출의 정보 저장
      let deletedSpendAmount;
      if(deletedUserSpend.useWon){ //원화 쓰는지 여부에 따른 소비량 갱신
        deletedSpendAmount = deletedUserSpend.spendAmount;
      }else{
        deletedSpendAmount = deletedUserSpend.spendAmount * (await this.travelService.findOne(deletedUserSpend.travel.travelId)).exchangeRate;
      }
      const deletedSpendCategory = deletedUserSpend.spendCategory;
      //userspend 제거
      await this.userSpendService.deleteUserSpend(spendId);
      //유저의 개인지출 정보 갱신을 위해 traveluserpair 불러오기
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
      console.log(deletedTravelSpend);

      let deletedSpendAmount;
      if(deletedTravelSpend.useWon){ //원화 쓰는지 여부에 따른 소비량 갱신
        deletedSpendAmount = deletedTravelSpend.spendAmount;
      }else{
        deletedSpendAmount = deletedTravelSpend.spendAmount * (await this.travelService.findOne(deletedTravelSpend.travel.travelId)).exchangeRate;
      }
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