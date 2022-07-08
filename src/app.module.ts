import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { Photo } from './user/domain/Photo';
import { User } from './user/domain/User';
import { UserModule } from './user/user.module';


@Module({
  imports: [TypeOrmModule.forRoot({
    type: 'mysql',
    host: 'localhost',
    port: 3306,
    username: 'root',
    password: 'madcampcs496',
    database: 'test',
    entities: [User, Photo],
    synchronize: true,
  }),
     UserModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
