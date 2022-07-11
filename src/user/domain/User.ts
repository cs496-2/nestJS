import { BaseEntity, Column, Entity, OneToMany, PrimaryColumn, PrimaryGeneratedColumn, Unique } from 'typeorm/index';
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
  @Column({ nullable:true })
  isActive: boolean;
  @OneToMany(type => UserSpend, userSpend => userSpend.user,{
    onDelete: 'CASCADE',
    eager: true
  })
  userSpends: UserSpend[]
  @OneToMany(type => TravelUserPair, travelUserPair => travelUserPair.user,{
    onDelete: 'CASCADE',
    eager: true
  })
  travelUserPairs: TravelUserPair[]
}