import { BaseEntity } from 'typeorm';
import { CoursesEntity } from './courses.entity';
export declare class CategoryEntity extends BaseEntity {
    id: string;
    title: string;
    image: string;
    description: string;
    course: CoursesEntity[];
    create_date: Date;
    update_date: Date;
}
