import { BaseEntity } from 'typeorm';
import { UsersEntity } from './users.entity';
export declare class TakeEntity extends BaseEntity {
    id: string;
    month: number;
    price: string;
    active: boolean;
    take_user: UsersEntity;
    create_date: Date;
    update_date: Date;
}
