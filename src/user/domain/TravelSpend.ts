import { BaseEntity, Column, Entity, JoinColumn, ManyToOne, OneToMany, PrimaryColumn, PrimaryGeneratedColumn, Unique } from 'typeorm/index';
import {Travel} from './Travel'
@Entity()

export class TravelSpend extends BaseEntity{
  @PrimaryGeneratedColumn()
  travelSpendId: number;
  @ManyToOne(type => Travel, travel =>travel.travelSpends)
  @JoinColumn({ name: 'ref_travelId', referencedColumnName: 'travelId' })
  travel: Travel;


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