import {
  BaseEntity,
  Column,
  CreateDateColumn,
  Entity,
  OneToMany,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';
import { HistoryEntity } from './history.entity';
import { TakeEntity } from './take.entity';

@Entity({ name: 'users' })
export class UsersEntity extends BaseEntity {
  @PrimaryGeneratedColumn('uuid', { name: 'user_id' })
  id: string;

  @Column({
    type: 'varchar',
    name: 'user_email',
    nullable: false,
  })
  email: string;

  @Column({
    type: 'varchar',
    name: 'user_password',
    nullable: false,
  })
  password: string;

  @OneToMany(() => TakeEntity, (take) => take.take_user)
  take: TakeEntity[];

  @OneToMany(() => HistoryEntity, (history) => history.history_user)
  user_history: HistoryEntity[];

  @CreateDateColumn({
    select: false,
  })
  create_date: Date;

  @UpdateDateColumn({
    select: false,
  })
  update_date: Date;
}
