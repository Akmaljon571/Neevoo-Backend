import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { CategoryEntity } from 'src/entities/category.entity';
import { CoursesEntity } from 'src/entities/courses.entity';
import { UsersEntity } from 'src/entities/users.entity';
import { VideosEntity } from 'src/entities/videos.entity';

@Injectable()
export class HistoryService {
  async validateUser(userId: string): Promise<UsersEntity> {
    const findUser: UsersEntity = await UsersEntity.findOne({
      where: {
        id: userId,
      },
    }).catch(() => {
      throw new HttpException('User Not Found', HttpStatus.NOT_FOUND);
    });

    if (!findUser) {
      throw new HttpException('User Not Found', HttpStatus.NOT_FOUND);
    }
    return findUser;
  }

  async get(id: string) {
    const findUser: UsersEntity = await this.validateUser(id);

    return await UsersEntity.find({
      relations: {
        user_history: {
          history_course: true,
        },
      },
      where: {
        id: findUser.id,
      },
    });
  }

  async hisobot() {
    const video = (await VideosEntity.find()).length;
    const course = (await CoursesEntity.find()).length;
    const yonalish = (await CategoryEntity.find()).length;
    const user = (await UsersEntity.find()).length;

    return {
      video,
      course,
      yonalish,
      user,
    };
  }
}
