import * as dotenv from 'dotenv';
import {
  MiddlewareConsumer,
  Module,
  NestModule,
  RequestMethod,
} from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ConfigModule } from '@nestjs/config';
import { config } from './config';
import { connectDb } from './ormconfig/typeorm.config';
import { TakeModule } from './module/take/take.module';
import { CategoriesModule } from './module/categories/categories.module';
import { TakeMiddleware } from './middleWare/take.middleware';
import { HistoryModule } from './module/history/history.module';
import { VideosModule } from './module/videos/videos.module';
import { UsersModule } from './module/users/users.module';
import { CourseModule } from './module/courses/course.module';
import { RedisModule } from '@liaoliaots/nestjs-redis';
dotenv.config();

@Module({
  imports: [
    ConfigModule.forRoot(config),
    TypeOrmModule.forRoot(connectDb),
    TakeModule,
    CategoriesModule,
    HistoryModule,
    CourseModule,
    RedisModule.forRoot({
      config: {
        host: 'localhost',
        port: 6379,
        password: '',
      },
    }),
    VideosModule,
    UsersModule,
    CourseModule,
  ],
})
export class AppModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    consumer
      .apply(TakeMiddleware)
      .forRoutes({ path: '*', method: RequestMethod.ALL });
  }
}
