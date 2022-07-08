import { Column, Entity, JoinColumn, ManyToOne, PrimaryGeneratedColumn } from 'typeorm/index';
import { User } from './User';
@Entity()
export class Photo {
  @PrimaryGeneratedColumn()
  id: number;
  @Column()
  url: string;
  @ManyToOne(type => User, user => user.photos)
  // @JoinColumn([{ name: 'ref_userId', referencedColumnName: 'userId' }, { name: 'ref_Id', referencedColumnName: 'id' }])
  @JoinColumn({ name: 'ref_userId', referencedColumnName: 'userId' })
  user: User;
}