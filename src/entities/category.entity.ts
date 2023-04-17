import {
  BaseEntity,
  Column,
  CreateDateColumn,
  Entity,
  OneToMany,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';
import { CoursesEntity } from './courses.entity';

@Entity({ name: 'category' })
export class CategoryEntity extends BaseEntity {
  @PrimaryGeneratedColumn('uuid', { name: 'cat_id' })
  id: string;

  @Column({
    type: 'varchar',
    name: 'cat_title',
    length: 65,
    nullable: false,
  })
  title: string;

  @Column({
    type: 'varchar',
    name: 'cat_image',
    nullable: false,
  })
  image: string;

  @Column({
    type: 'varchar',
    name: 'cat_description',
    nullable: false,
  })
  description: string;

  @OneToMany(() => CoursesEntity, (course) => course.course_cat)
  course: CoursesEntity[];

  @CreateDateColumn({
    select: false,
  })
  create_date: Date;

  @UpdateDateColumn({
    select: false,
  })
  update_date: Date;
}
