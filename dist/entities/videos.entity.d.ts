import { BaseEntity } from 'typeorm';
import { CategoryEntity } from './category.entity';
export declare class VideosEntity extends BaseEntity {
    id: string;
    text: string;
    sequence: number;
    link: string;
    duration: string;
    course: CategoryEntity;
    create_date: Date;
    update_date: Date;
}
