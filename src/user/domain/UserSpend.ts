import { BaseEntity, Column, Entity, JoinColumn, ManyToOne, OneToMany, PrimaryColumn, PrimaryGeneratedColumn, Unique } from 'typeorm/index';
import {Travel} from './Travel'
import { User } from './User';
@Entity()

export class UserSpend extends BaseEntity{
  @PrimaryGeneratedColumn()
  userSpendId: number;

  @ManyToOne(type => Travel, travel =>travel.userSpends)
  @JoinColumn({ name: 'ref_travelId', referencedColumnName: 'travelId' })
  travel: Travel;

  @ManyToOne(type => User, user =>user.userSpends)
  @JoinColumn({ name: 'ref_userId', referencedColumnName: 'userId' })
  user: User;

  @Column()
  spendName: string;
  @Column()
  createdDate: Date;
  @Column()
  spendAmount: number;
  @Column()
  useWon : boolean;
  @Column()
  spendCategory : number;

  // Save code below to remember how to set relation between tables
  // @OneToMany(type => Photo, photo => photo.user)
  // photos: Photo[]
}