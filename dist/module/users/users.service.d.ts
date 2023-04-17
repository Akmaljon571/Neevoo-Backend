import { UsersEntity } from 'src/entities/users.entity';
import { UpdateUserDto } from './dto/update-user.dto';
import { TokenMiddleware } from 'src/middleWare/token.middleware';
import { RegistrUserDto } from './dto/registr';
import { RedisService } from '@liaoliaots/nestjs-redis';
import { ParolEmailUserDto } from './dto/parol_email';
import { ParolUserDto } from './dto/parol';
export declare class UsersService {
    private readonly redisService;
    private readonly tokenmiddleware;
    private readonly redis;
    constructor(redisService: RedisService, tokenmiddleware: TokenMiddleware);
    verifyUser(headers: any): Promise<any>;
    registr(body: RegistrUserDto): Promise<{
        message: string;
        status: number;
    }>;
    registr_email(random: string): Promise<{
        token: string;
        status: number;
    }>;
    login(body: RegistrUserDto): Promise<{
        token: string;
        status: number;
    }>;
    parol(body: ParolUserDto): Promise<{
        message: string;
        status: number;
    }>;
    parol_email(random: string, body: ParolEmailUserDto): Promise<{
        message: string;
        status: number;
    }>;
    getAdmin(headers: any): Promise<UsersEntity[] | any[]>;
    getOne(headers: any): Promise<UsersEntity | any>;
    update(headers: any, payload: UpdateUserDto): Promise<void>;
    deleteUser(headers: any): Promise<void>;
}
