import { BaseEntity } from 'typeorm';
import { CoursesEntity } from './courses.entity';
import { UsersEntity } from './users.entity';
export declare class HistoryEntity extends BaseEntity {
    id: string;
    history_course: CoursesEntity;
    history_user: UsersEntity;
    create_date: Date;
    update_date: Date;
}
