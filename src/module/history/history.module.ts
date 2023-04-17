import { Module } from '@nestjs/common';
import { TokenMiddleware } from 'src/middleWare/token.middleware';
import { HistoryControlller } from './history.controller';
import { HistoryService } from './history.service';

@Module({
  controllers: [HistoryControlller],
  providers: [HistoryService, TokenMiddleware],
})
export class HistoryModule {}
