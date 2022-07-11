import { BaseEntity, Column, Entity, OneToMany, PrimaryColumn, PrimaryGeneratedColumn, Unique } from 'typeorm/index';
import { Schedule } from './Schedule';
import { TravelSpend } from './TravelSpend';
import { TravelUserPair } from './TravelUserPair';
import { UserSpend } from './UserSpend';
@Entity()

@Unique(['travelId'])
export class Travel extends BaseEntity{
  @PrimaryGeneratedColumn()
  travelId: number;
  @Column({nullable:true})
  travelName: string;
  @Column({nullable:true})
  travelCountry: string;
  @Column({nullable:true})
  startDate:Date
  @Column({nullable:true})
  endDate:Date
  @Column({nullable:true})
  foreignCurrency: string;
  @Column({nullable:true})
  coverImg: string;
  @Column({type: 'decimal', precision:10, scale:2, nullable:true})
  exchangeRate:number;   // 환율값, spend 값들에는 useWon  = true일 시 spendamount를 그대로 추가, false일 시 spendamount * exchangeRate 값 추가
  @Column({nullable:true})
  totalSpend:number
  @Column({nullable:true})
  mealSpend:number;
  @Column({nullable:true})
  shopSpend:number;
  @Column({nullable:true})
  tourSpend:number;
  @Column({nullable:true})
  transportSpend:number;
  @Column({nullable:true})
  hotelSpend:number;
  @Column({nullable:true})
  etcSpend:number;
  // Save code below to remember how to set relation between tables
  // @OneToMany(type => Photo, photo => photo.user)
  // photos: Photo[]
  @OneToMany(type => TravelSpend, travelSpend => travelSpend.travel,{
    onDelete: 'CASCADE',
    eager: true
  })
  travelSpends: TravelSpend[]
  @OneToMany(type => UserSpend, userSpend => userSpend.travel,{
    onDelete: 'CASCADE',
    eager: true
  })
  userSpends: UserSpend[]
  @OneToMany(type => TravelUserPair, travelUserPair => travelUserPair.travel,{
    onDelete: 'CASCADE',
    eager: true
  })
  travelUserPairs: TravelUserPair[]
  @OneToMany(type => Schedule, schedule => schedule.travel,{
    onDelete: 'CASCADE',
    eager: true
  })
  schedules: Schedule[];
}