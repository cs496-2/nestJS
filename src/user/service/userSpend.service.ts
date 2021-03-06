import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from '../domain/User';
import { Connection, Repository } from 'typeorm/index';
import { Travel } from '../domain/Travel';
import { TravelUserPair } from '../domain/TravelUserPair';
import { TravelSpend } from '../domain/TravelSpend';
import { UserSpend } from '../domain/UserSpend';
@Injectable()
export class UserSpendService {
  constructor(
    @InjectRepository(User) private userRepository: Repository<User>,
    @InjectRepository(Travel) private travelRepository: Repository<Travel>,
    @InjectRepository(TravelUserPair) private travelUserPairRepository: Repository<User>,
    @InjectRepository(TravelSpend) private travelSpendRepository: Repository<TravelSpend>,
    @InjectRepository(UserSpend) private userSpendRepository: Repository<UserSpend>,
    // private connection: Connection
  ) {
    // this.connection = connection;
    this.userRepository = userRepository;
    this.travelRepository = travelRepository;
    this.travelUserPairRepository = travelUserPairRepository;
    this.travelSpendRepository = travelSpendRepository;
    this.userSpendRepository = userSpendRepository;
  }
  /**
   * User 리스트 조회
   */
  async findAll(): Promise<UserSpend[]> {
    return await this.userSpendRepository.find();
  }

  async findWithUserTravelCondition(travelId: number, userId: string): Promise<UserSpend[]>{
    return await this.userSpendRepository.find(
      {
        where: {
          travel: {travelId: travelId},
          user: {userId: userId}
        }
      }
    )
  }

  /**
   * 특정 유저 조회
   * @param id
   */
  async findOne(id: number): Promise<UserSpend> {
    return await this.userSpendRepository.findOne(
      
      {
        loadRelationIds: {
          relations: [
            'travel',
            'user'
          ],
          disableMixedMap: true
        },
        where: {
          userSpendId: id
        }
      }

     );
  }
  
  /**
   * 유저 저장
   * @param travel
   */
  async saveUserSpend(userSpend: UserSpend): Promise<void> {
    await this.userSpendRepository.save(userSpend);
  }
  /**
   * 유저 삭제
   */
  async deleteUserSpend(id: number): Promise<void> {
    await this.userSpendRepository.delete({ userSpendId: id });
  }


/**
   * 다수의 유저 입력
   */
  // async createUsers(users: User[]) {
  //   let isSuccess = true;
  //   const queryRunner = this.connection.createQueryRunner();
  //   await queryRunner.connect();
  //   await queryRunner.startTransaction();
  //   try {
  //     await queryRunner.manager.save(users[0]); // (1)
  //     await queryRunner.manager.save(users[1]); // (2)**
  //     await queryRunner.commitTransaction();
  //   } catch (err) {
  //     console.log('Rollback 실행..')
  //     await queryRunner.rollbackTransaction();
  //     isSuccess = false;
  //   } finally {
  //     await queryRunner.release();
  //     return isSuccess;
  //   }
  // }




}

// import { Injectable } from '@nestjs/common';
// import { UserDto } from './dto/user.dto';
// @Injectable()
// export class UserService {
//   private users: UserDto[] = [
//     new UserDto('lee1', '이정주'),
//     new UserDto('kim1', '김명일'),
//   ];
//   findAll() : Promise<UserDto[]> {
//     return new Promise((resolve) =>
//       setTimeout(
//         () => resolve(this.users),
//         100,
//       ),
//     );
//   }
//   findOne(id: string) : UserDto | object {
//     const foundOne = this.users.filter(user => user.userId === id);
//     return foundOne.length ? foundOne[0] : { msg: 'nothing' };
//   }
//   saveUser(userDto: UserDto) : void {
//     this.users = [...this.users, userDto];
//   }
// }