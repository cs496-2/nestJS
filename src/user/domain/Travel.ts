import { BaseEntity, Column, Entity, OneToMany, PrimaryColumn, PrimaryGeneratedColumn, Unique } from 'typeorm/index';
import { TravelSpend } from './TravelSpend';
import { TravelUserPair } from './TravelUserPair';
import { UserSpend } from './UserSpend';
@Entity()

@Unique(['travelId'])
export class Travel extends BaseEntity{
  @PrimaryGeneratedColumn()
  travelId: number;
  @Column()
  travelName: string;
  @Column()
  travelCountry: string;
  @Column()
  startDate:Date
  @Column()
  endDate:Date
  @Column()
  foreignCurrency: string;
  @Column()
  coverImg: string;
  @Column()
  totalSpend:number
  @Column()
  mealSpend:number;
  @Column()
  shopSpend:number;
  @Column()
  tourSpend:number;
  @Column()
  transportSpend:number;
  @Column()
  hotelSpend:number;
  @Column()
  etcSpend:number;
  // Save code below to remember how to set relation between tables
  // @OneToMany(type => Photo, photo => photo.user)
  // photos: Photo[]
  @OneToMany(type => TravelSpend, travelSpend => travelSpend.travel)
  travelSpends: TravelSpend[]
  @OneToMany(type => UserSpend, userSpend => userSpend.travel)
  userSpends: UserSpend[]
  @OneToMany(type => TravelUserPair, travelUserPair => travelUserPair.travel)
  travelUserPairs: TravelUserPair[]
}