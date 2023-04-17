import { Module } from '@nestjs/common';
import { TakeService } from './take.service';
import { TakeController } from './take.controller';
import { TokenMiddleware } from 'src/middleWare/token.middleware';

@Module({
  controllers: [TakeController],
  providers: [TakeService, TokenMiddleware],
})
export class TakeModule {}
