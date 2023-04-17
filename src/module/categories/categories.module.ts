import { Module } from '@nestjs/common';
import { CategoriesService } from './categories.service';
import { CategoriesController } from './categories.controller';
import { TokenMiddleware } from 'src/middleWare/token.middleware';

@Module({
  controllers: [CategoriesController],
  providers: [CategoriesService, TokenMiddleware],
})
export class CategoriesModule {}
