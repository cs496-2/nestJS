import { Module } from '@nestjs/common';
import { UserController } from './user.controller';
import { UserService } from './user.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from './domain/User';
import { Photo } from './domain/Photo';
import { Travel } from './domain/Travel';
import { TravelSpend } from './domain/TravelSpend';
import { UserSpend } from './domain/UserSpend';
import { TravelUserPair } from './domain/TravelUserPair';

@Module({
  imports: [TypeOrmModule.forFeature([User, Photo, Travel, TravelSpend, UserSpend, TravelUserPair])],
  controllers: [UserController],
  providers: [UserService],
})
export class UserModule {}