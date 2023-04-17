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
import { CategoryEntity } from './category.entity';
import { CoursesEntity } from './courses.entity';

@Entity({ name: 'videos' })
export class VideosEntity extends BaseEntity {
  @PrimaryGeneratedColumn('uuid', { name: 'video_id' })
  id: string;

  @Column({
    type: 'varchar',
    name: 'video_text',
    length: 100,
    nullable: false,
  })
  text: string;

  @Column({
    type: 'integer',
    name: 'video_sequence',
    nullable: false,
  })
  sequence: number;

  @Column({
    type: 'varchar',
    name: 'video_link',
    nullable: false,
  })
  link: string;

  @Column({
    type: 'varchar',
    name: 'video_duration',
    nullable: false,
  })
  duration: string;

  @ManyToOne(() => CoursesEntity, (course) => course.video, {
    onDelete: 'CASCADE',
  })
  @JoinColumn({ name: 'video_course' })
  course: CategoryEntity;

  @CreateDateColumn({
    select: false,
  })
  create_date: Date;

  @UpdateDateColumn({
    select: false,
  })
  update_date: Date;
}
