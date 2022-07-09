import { BaseEntity, Column, Entity, OneToMany, PrimaryColumn, PrimaryGeneratedColumn, Unique } from 'typeorm/index';
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
}