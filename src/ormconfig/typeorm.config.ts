import { CoursesEntity } from './../entities/courses.entity';
import { TypeOrmModuleOptions } from '@nestjs/typeorm';
import * as dotenv from 'dotenv';
import { CategoryEntity } from 'src/entities/category.entity';
import { UsersEntity } from 'src/entities/users.entity';
import { HistoryEntity } from 'src/entities/history.entity';
import { TakeEntity } from 'src/entities/take.entity';
import { VideosEntity } from 'src/entities/videos.entity';
dotenv.config();

export const connectDb: TypeOrmModuleOptions = {
  type: 'postgres',
  host: process.env.DB_HOST,
  port: 5432,
  password: process.env.DB_PASSWORD,
  username: process.env.DB_USERNAME,
  database: process.env.DATABASE,
  entities: [
    UsersEntity,
    CategoryEntity,
    CoursesEntity,
    HistoryEntity,
    TakeEntity,
    VideosEntity,
  ],
  synchronize: true,
};
