import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { Photo } from './user/domain/Photo';
import { Travel } from './user/domain/Travel';
import { TravelSpend } from './user/domain/TravelSpend';
import { TravelUserPair } from './user/domain/TravelUserPair';
import { User } from './user/domain/User';
import { UserSpend } from './user/domain/UserSpend';
import { UserModule } from './user/user.module';


@Module({
  imports: [TypeOrmModule.forRoot({
    type: 'mysql',
    host: 'localhost',
    port: 3306,
    username: 'root',
    password: 'madcampcs496',
    database: 'test',
    entities: [User, Photo, Travel, TravelSpend, UserSpend, TravelUserPair],
    synchronize: true,
  }),
     UserModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
