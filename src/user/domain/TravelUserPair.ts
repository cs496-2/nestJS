import { type } from 'os';
import { BaseEntity, Column, Entity, JoinColumn, ManyToOne, OneToMany, PrimaryColumn, PrimaryGeneratedColumn, Unique } from 'typeorm/index';
import {Travel} from './Travel'
import { User } from './User';
@Entity()
@Unique(['travel', 'user'])
export class TravelUserPair extends BaseEntity{

  @PrimaryGeneratedColumn()
  travelUserPairId: number;

  // @PrimaryColumn()
  // @ManyToOne(() => Travel, travel => travel.travelUserPairs, {primary: true})
  @ManyToOne(type => Travel, travel => travel.travelUserPairs,{
    onDelete: 'CASCADE'
  })
  @JoinColumn({ name: 'ref_travelId', referencedColumnName: 'travelId' })
  travel: Travel;

  // @PrimaryColumn()
  // @ManyToOne(type => User, user => user.travelUserPairs, {primary: true})
  @ManyToOne(type => User, user => user.travelUserPairs,{
    onDelete: 'CASCADE'
  })
  @JoinColumn({ name: 'ref_userId', referencedColumnName: 'userId' })
  user: User;


  

  @Column()
  personalTotalSpend: number;
  @Column()
  personalMealSpend: number;
  @Column()
  personalShopSpend: number;
  @Column()
  personalTourSpend : number;
  @Column()
  personalTransportSpend : number;
  @Column()
  personalHotelSpend : number;
  @Column()
  personalEtcSpend : number;
  // Save code below to remember how to set relation between tables
  // @OneToMany(type => Photo, photo => photo.user)
  // photos: Photo[]
}