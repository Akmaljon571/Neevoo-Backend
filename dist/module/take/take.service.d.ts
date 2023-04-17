import { TakeEntity } from './../../entities/take.entity';
import { UsersEntity } from 'src/entities/users.entity';
import { CreateTakeDto } from './dto/create-take.dto';
export declare class TakeService {
    validateUser(userId: string): Promise<UsersEntity>;
    create(body: CreateTakeDto): Promise<void>;
    findAll(): Promise<TakeEntity[]>;
    remove(id: string): Promise<void>;
}
