import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from '../domain/User';
import { Connection, Repository } from 'typeorm/index';
import { Travel } from '../domain/Travel';
import { TravelUserPair } from '../domain/TravelUserPair';
import { TravelSpend } from '../domain/TravelSpend';
import { UserSpend } from '../domain/UserSpend';
@Injectable()
export class TravelSpendService {
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
  async findAll(): Promise<TravelSpend[]> {
    return await this.travelSpendRepository.find();
  }


  async findWithTravelCondition(travelId: number): Promise<TravelSpend[]>{
    return await this.travelSpendRepository.find(
      {
        where: {
          travel: {travelId: travelId}
        }
      }
    )
  }

  /**
   * 특정 유저 조회
   * @param id
   */
  async findOne(id: number): Promise<TravelSpend> {
    const result = await this.travelSpendRepository.findOne(
      {
        loadRelationIds: {
          relations: [
            'travel'
          ],
          disableMixedMap: true
        },
        where: {
          travelSpendId: id
        }
      }
    );
    // const result = await this.travelSpendRepository.findOne(
    //   {
    //     where: {
    //       travelSpendId : id
    //     }
    //   }
    // );
    console.log(result);
    return result;
    // return await this.travelSpendRepository.findOne(
    //   {
    //     loadRelationIds: {
    //       relations: [
    //         'travel'
    //       ],
    //       disableMixedMap: true
    //     },
    //     where: {
    //       travel: {travelId: id}
    //     }
    //   }
    // );
  }

  // async findWithUserTravelCondition(userId: string, travelId:number): Promise<TravelUserPair>{
  //   // const result = await this.travelUserPairRepository.find(
  //   //   {
  //   //     loadRelationIds: {
  //   //       relations: [
  //   //         'travel',
  //   //         'user'
  //   //       ],
  //   //       disableMixedMap: true
  //   //     },
  //   //     // select: [
  //   //     //   'travelUserPairId',
  //   //     //   'travel',
  //   //     //   'user'
  //   //     // ],
  //   //     where: {
  //   //       user: {userId: userId}
  //   //     }
  //   //   }
  //   // );
  //   // console.log(result);
  //   // console.log("RESULT [0] is... ");
  //   // console.log(result[0]);
  //   // console.log(result[0].user);
  //   // console.log(`primary result : ${result}`);
  //   return await this.travelUserPairRepository.findOne(
  //     {
  //       loadRelationIds: {
  //         relations: [
  //           'travel',
  //           'user'
  //         ],
  //         disableMixedMap: true
  //       },
  //       where: {
  //         user: {userId: userId},
  //         travel: {travelId: travelId}
  //       }
  //     }
  //   )
  // }
  /**
   * 유저 저장
   * @param travel
   */
  async saveTravelSpend(travelSpend: TravelSpend): Promise<void> {
    await this.travelSpendRepository.save(travelSpend);
  }
  /**
   * 유저 삭제
   */
  async deleteTravelSpend(id: number): Promise<void> {
    await this.travelSpendRepository.delete({ travelSpendId: id });
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