import { Module } from '@nestjs/common';
import { UsersService } from './users.service';
import { UsersController } from './users.controller';
import { TokenMiddleware } from 'src/middleWare/token.middleware';

@Module({
  controllers: [UsersController],
  providers: [UsersService, TokenMiddleware],
})
export class UsersModule {}
