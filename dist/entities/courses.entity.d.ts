import { BaseEntity } from 'typeorm';
import { CategoryEntity } from './category.entity';
import { HistoryEntity } from './history.entity';
import { VideosEntity } from './videos.entity';
export declare class CoursesEntity extends BaseEntity {
    id: string;
    title: string;
    image: string;
    lang: string;
    description: string;
    course_cat: CategoryEntity;
    course_history: HistoryEntity[];
    video: VideosEntity[];
    create_date: Date;
    update_date: Date;
}
