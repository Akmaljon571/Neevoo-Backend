import { UsersService } from './users.service';
import { UpdateUserDto } from './dto/update-user.dto';
import { RegistrUserDto } from './dto/registr';
import { ParolUserDto } from './dto/parol';
import { ParolEmailUserDto } from './dto/parol_email';
export declare class UsersController {
    private readonly usersService;
    constructor(usersService: UsersService);
    registr(body: RegistrUserDto): Promise<{
        message: string;
        status: number;
    }>;
    registrEmail(param: string): Promise<{
        token: string;
        status: number;
    }>;
    parol(body: ParolUserDto): Promise<{
        message: string;
        status: number;
    }>;
    parolEmail(param: string, body: ParolEmailUserDto): Promise<{
        message: string;
        status: number;
    }>;
    login(body: RegistrUserDto): Promise<{
        token: string;
        status: number;
    }>;
    getAdmin(headers: any): Promise<any[] | import("../../entities/users.entity").UsersEntity[]>;
    getOne(headers: any): Promise<any>;
    update(headers: any, body: UpdateUserDto): Promise<void>;
    deleteUser(headers: any): Promise<void>;
}
