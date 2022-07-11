import { BaseEntity, Column, Entity, JoinColumn, ManyToOne, PrimaryGeneratedColumn } from 'typeorm/index';
import { Travel } from './Travel';
@Entity()
export class Schedule extends BaseEntity{
  @PrimaryGeneratedColumn()
  scheduleId: number;
  @Column()
  scheduleName: string;
  @Column()
  date: string;
  @Column()
  time: string;
  @Column()
  location: string;
  @Column({type: 'decimal', precision:6, scale:3, nullable:true})
  locationX: number;
  @Column({type: 'decimal', precision:6, scale:3, nullable:true})
  locationY: number; 
  @ManyToOne(type => Travel, travel => travel.schedules)
  // @JoinColumn([{ name: 'ref_userId', referencedColumnName: 'userId' }, { name: 'ref_Id', referencedColumnName: 'id' }])
  @JoinColumn({ name: 'ref_travelId', referencedColumnName: 'travelId' })
  travel: Travel;
}