import { Module } from '@nestjs/common';
import { UserController } from './controller/user.controller';
import { UserService } from './service/user.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from './domain/User';
import { Photo } from './domain/Photo';
import { Travel } from './domain/Travel';
import { TravelSpend } from './domain/TravelSpend';
import { UserSpend } from './domain/UserSpend';
import { TravelUserPair } from './domain/TravelUserPair';
import { TravelController } from './controller/travel.controller';
import { TravelService } from './service/travel.service';
import { TravelUserPairService } from './service/travelUserPair.service';
import { TravelSpendService } from './service/travelSpend.service';
import { UserSpendService } from './service/userSpend.service';
// import { SpendController } from './controller/spend.controller';

@Module({
  imports: [TypeOrmModule.forFeature([User, Photo, Travel, TravelSpend, UserSpend, TravelUserPair])],
  controllers: [UserController, TravelController],
  providers: [UserService, TravelService, TravelUserPairService, TravelSpendService, UserSpendService],
})
export class UserModule {}