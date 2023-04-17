import { TokenMiddleware } from 'src/middleWare/token.middleware';
import { HistoryService } from './history.service';
export declare class HistoryControlller {
    private historyService;
    private readonly veridfyToken;
    constructor(historyService: HistoryService, veridfyToken: TokenMiddleware);
    get(headers: any): Promise<import("../../entities/users.entity").UsersEntity[]>;
    hisobot(): Promise<{
        video: number;
        course: number;
        yonalish: number;
        user: number;
    }>;
}
