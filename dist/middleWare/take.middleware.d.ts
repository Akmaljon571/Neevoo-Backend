import { NestMiddleware } from '@nestjs/common';
import { Request, Response, NextFunction } from 'express';
export declare class TakeMiddleware implements NestMiddleware {
    date(time: Date): string;
    trim(st: string): number;
    plus(date: string[], month: number): number[];
    taqoslash(result: number[], today: number[], id: string): Promise<void>;
    use(req: Request, res: Response, next: NextFunction): Promise<void>;
}
