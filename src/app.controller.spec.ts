import { Test, TestingModule } from '@nestjs/testing';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { Photo } from './user/domain/Photo';
import { User } from './user/domain/User';
import { UserController } from './user/user.controller';
import { UserService } from './user/user.service';

// export const getTypeOrmModule = () => {
//   return TypeOrmModule.forRoot({
//     type: 'postgres',
//     host: 'localhost',
//     port: 5432,
//     username: 'postgres',
//     password: 'password',
//     database: 'uaa',
//     autoLoadEntities: true,
//     // entities: [User, Photo],
//     synchronize: true,
//   })
// };
// describe('테스트', () => {
//   let app: TestingModule;
  
//   beforeAll(async () => {
//     app = await Test.createTestingModule({
//       imports: [getTypeOrmModule(), TypeOrmModule.forFeature([User, Photo])],
//       controllers: [UserController],
//       providers: [UserService],
//     }).compile();
//   });  
//   describe('UserService 테스트', () => {
//     it('**createUsers 트랜잭션 처리 테스트 - 성공', async () => {
//       const userService = app.get<UserService>(UserService);
//       let user1 = new User();
//       user1.userId = 'a1';
//       user1.userName = 'a1';
//       user1.userPassword = '1234';
//       user1.age = 10;
//       user1.isActive = true;
//       user1.photos = [];
//       let user2 = new User();
//       user2.userId = 'b1';
//       user2.userName = 'b1';
//       user2.userPassword = '1234';
//       user2.age = 10;
//       user2.isActive = true;
//       user2.photos = [];

//       const isSuccess = await userService.createUsers([
//         user1,
//         user2
//       ]);
//       console.log(isSuccess);
//       expect(isSuccess).toBeTruthy();
//     });
//     it('**createUsers 트랜잭션 처리 테스트 - 실패', async () => {
//       const userService = app.get<UserService>(UserService);
//       let user1 = new User();
//       user1.userId = 'a1';
//       user1.userName = 'a1';
//       user1.userPassword = '1234';
//       user1.age = 10;
//       user1.isActive = true;
//       user1.photos = [];
//       let user2 = new User();
//       user2.userId = 'null';
//       user2.userName = 'b1';
//       user2.userPassword = '1234';
//       user2.age = 10;
//       user2.isActive = true;
//       user2.photos = [];
//       const isSuccess = await userService.createUsers([
//         user1,
//         user2
//       ]);
//       console.log(isSuccess);
//       expect(isSuccess).toBeFalsy();
//     });
//   });
// });


describe('AppController', () => {
  let app: TestingModule;

  beforeAll(async () => {
    app = await Test.createTestingModule({
      controllers: [AppController],
      providers: [AppService],
    }).compile();
  });

  describe('getHello', () => {
    it('should return "Hello World!"', () => {
      const appController = app.get<AppController>(AppController);
      expect(appController.getHello()).toBe('Hello World!');
    });
  });
});
