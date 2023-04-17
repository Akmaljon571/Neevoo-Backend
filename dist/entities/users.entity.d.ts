import { BaseEntity } from 'typeorm';
import { HistoryEntity } from './history.entity';
import { TakeEntity } from './take.entity';
export declare class UsersEntity extends BaseEntity {
    id: string;
    email: string;
    password: string;
    take: TakeEntity[];
    user_history: HistoryEntity[];
    create_date: Date;
    update_date: Date;
}
