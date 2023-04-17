import { Module } from '@nestjs/common';
import { TokenMiddleware } from 'src/middleWare/token.middleware';
import { VideosController } from './videos.controller';
import { VideosService } from './videos.service';

@Module({
  controllers: [VideosController],
  providers: [VideosService, TokenMiddleware],
})
export class VideosModule {}
