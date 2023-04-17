import { TakeService } from './take.service';
import { CreateTakeDto } from './dto/create-take.dto';
import { TokenMiddleware } from 'src/middleWare/token.middleware';
export declare class TakeController {
    private readonly takeService;
    private readonly veridfyToken;
    constructor(takeService: TakeService, veridfyToken: TokenMiddleware);
    findAll(headers: any): Promise<import("../../entities/take.entity").TakeEntity[]>;
    create(body: CreateTakeDto, headers: any): Promise<void>;
    remove(id: string, headers: any): Promise<void>;
}
