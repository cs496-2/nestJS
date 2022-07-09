import { BaseEntity, Column, Entity, JoinColumn, ManyToOne, OneToMany, PrimaryColumn, PrimaryGeneratedColumn, Unique } from 'typeorm/index';
import {Travel} from './Travel'
@Entity()

export class TravelSpend extends BaseEntity{
  @PrimaryGeneratedColumn()
  travelSpendId: number;
  @ManyToOne(type => Travel, travel =>travel.travelSpends,{
    onDelete: 'CASCADE'
  })
  @JoinColumn({ name: 'ref_travelId', referencedColumnName: 'travelId' })
  travel: Travel;


  @Column()
  spendName: string;
  @Column({nullable:true})
  createdDate: Date;
  @Column({nullable:true})
  spendAmount: number;
  @Column({nullable:true})
  useWon : boolean;
  @Column({nullable:true})
  spendCategory : number;
  // Save code below to remember how to set relation between tables
  // @OneToMany(type => Photo, photo => photo.user)
  // photos: Photo[]
}