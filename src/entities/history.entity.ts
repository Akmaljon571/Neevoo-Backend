import {
  BaseEntity,
  CreateDateColumn,
  Entity,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';
import { CoursesEntity } from './courses.entity';
import { UsersEntity } from './users.entity';

@Entity({ name: 'history' })
export class HistoryEntity extends BaseEntity {
  @PrimaryGeneratedColumn('uuid', { name: 'history_id' })
  id: string;

  @ManyToOne(() => CoursesEntity, (course) => course.course_history, {
    onDelete: 'CASCADE',
  })
  @JoinColumn({ name: 'history_course' })
  history_course: CoursesEntity;

  @ManyToOne(() => UsersEntity, (user) => user.user_history, {
    onDelete: 'CASCADE',
  })
  @JoinColumn({ name: 'history_user' })
  history_user: UsersEntity;

  @CreateDateColumn({
    select: false,
  })
  create_date: Date;

  @UpdateDateColumn({
    select: false,
  })
  update_date: Date;
}
