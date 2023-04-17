import {
  BaseEntity,
  Column,
  CreateDateColumn,
  Entity,
  JoinColumn,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';
import { CategoryEntity } from './category.entity';
import { HistoryEntity } from './history.entity';
import { VideosEntity } from './videos.entity';

@Entity({ name: 'courses' })
export class CoursesEntity extends BaseEntity {
  @PrimaryGeneratedColumn('uuid', { name: 'course_id' })
  id: string;

  @Column({
    type: 'varchar',
    name: 'course_title',
    length: 65,
    nullable: false,
  })
  title: string;

  @Column({
    type: 'varchar',
    name: 'course_image',
    nullable: false,
  })
  image: string;

  @Column({
    type: 'varchar',
    name: 'course_lang',
    nullable: false,
  })
  lang: string;

  @Column({
    type: 'varchar',
    name: 'course_description',
    nullable: false,
  })
  description: string;

  @ManyToOne(() => CategoryEntity, (category) => category.course, {
    onDelete: 'CASCADE',
  })
  @JoinColumn({ name: 'course_cat' })
  course_cat: CategoryEntity;

  @OneToMany(() => HistoryEntity, (history) => history.history_course)
  course_history: HistoryEntity[];

  @OneToMany(() => VideosEntity, (video) => video.course)
  video: VideosEntity[];

  @CreateDateColumn()
  create_date: Date;

  @UpdateDateColumn({
    select: false,
  })
  update_date: Date;
}
