import {
  BaseEntity,
  Column,
  CreateDateColumn,
  Entity,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';
import { UsersEntity } from './users.entity';

@Entity({ name: 'take' })
export class TakeEntity extends BaseEntity {
  @PrimaryGeneratedColumn('uuid', { name: 'take_id' })
  id: string;

  @Column({
    type: 'integer',
    name: 'take_month',
    nullable: false,
  })
  month: number;

  @Column({
    type: 'varchar',
    name: 'take_price',
    nullable: false,
  })
  price: string;

  @Column({
    type: 'boolean',
    nullable: false,
    name: 'take_active',
    default: true,
  })
  active: boolean;

  @ManyToOne(() => UsersEntity, (user) => user.take, {
    onDelete: 'CASCADE',
  })
  @JoinColumn({ name: 'take_user' })
  take_user: UsersEntity;

  @CreateDateColumn()
  create_date: Date;

  @UpdateDateColumn({
    select: false,
  })
  update_date: Date;
}
