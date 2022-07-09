import { BaseEntity, Column, Entity, OneToMany, PrimaryColumn, PrimaryGeneratedColumn, Unique } from 'typeorm/index';
import { Photo } from './Photo';
import { TravelUserPair } from './TravelUserPair';
import { UserSpend } from './UserSpend';
@Entity()

@Unique(['userId'])
export class User extends BaseEntity{
  // @PrimaryGeneratedColumn('increment')
  // @PrimaryGeneratedColumn('uuid')
  // @PrimaryGeneratedColumn()
  // id: number;
  // @Column()
  @PrimaryColumn()
  userId: string;
  @Column({nullable:true})
  userName: string;
  @Column({nullable:true})
  userPassword: string;
  @Column({nullable:true})
  age: number;
  @Column({ default: true })
  isActive: boolean;
  @OneToMany(type => Photo, photo => photo.user)
  photos: Photo[]
  @OneToMany(type => UserSpend, userSpend => userSpend.user)
  userSpends: UserSpend[]
  @OneToMany(type => TravelUserPair, travelUserPair => travelUserPair.user)
  travelUserPairs: TravelUserPair[]
}