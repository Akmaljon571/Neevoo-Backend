import { UsersEntity } from 'src/entities/users.entity';
export declare class HistoryService {
    validateUser(userId: string): Promise<UsersEntity>;
    get(id: string): Promise<UsersEntity[]>;
    hisobot(): Promise<{
        video: number;
        course: number;
        yonalish: number;
        user: number;
    }>;
}
