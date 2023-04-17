import { CoursesEntity } from './../../entities/courses.entity';
import { Injectable, HttpStatus, HttpException } from '@nestjs/common';
import { CreateCourseDto } from './dto/create-course.dto';
import { UpdateCourseDto } from './dto/update-course.dto';
import { CategoryEntity } from 'src/entities/category.entity';

@Injectable()
export class CourseService {
  date(time: Date): string {
    const date = JSON.stringify(time)
      .split('T')[0]
      .split('"')[1]
      .split('-')
      .reverse()
      .join(' ');

    return date;
  }

  async byCategory(cat_id: any) {
    const [corse] = await CategoryEntity.find({
      where: {
        id: cat_id,
      },
    }).catch(() => {
      throw new HttpException('Category Not Found', HttpStatus.NOT_FOUND);
    });
    const all = await CoursesEntity.find({
      order: {
        create_date: 'ASC',
      },
      relations: {
        video: true,
        course_cat: true,
      },
      where: {
        course_cat: corse as any,
      },
    }).catch(() => {
      throw new HttpException('Bad Request', HttpStatus.BAD_REQUEST);
    });
    const result: any = all;

    for (let i = 0; i < all.length; i++) {
      result[i].video_count = all[i].video.length;
      result[i].create = this.date(all[i].create_date);
      result[i].category = all[i].course_cat?.title;
      delete result[i].video;
      delete result[i].course_cat;
      delete result[i].create_date;
    }
    return result;
  }

  async searchTitle(name: string) {
    const title = name.toLowerCase().trim();
    let tasks: any = this.findAll();

    if (title) {
      tasks = (await tasks).filter((task: any) =>
        task.title.toLowerCase().includes(title),
      );
    }
    return tasks;
  }

  async findAll() {
    const all = await CoursesEntity.find({
      order: {
        create_date: 'ASC',
      },
      relations: {
        video: true,
        course_cat: true,
      },
    }).catch(() => {
      throw new HttpException('BAD GATEWAY', HttpStatus.BAD_GATEWAY);
    });
    const result: any = all;

    for (let i = 0; i < all.length; i++) {
      result[i].video_count = all[i].video.length;
      result[i].create = this.date(all[i].create_date);
      result[i].category = all[i].course_cat?.title;
      delete result[i].video;
      delete result[i].course_cat;
    }

    return all;
  }

  async create(createCourseDto: CreateCourseDto, imgLink: any) {
    await CoursesEntity.createQueryBuilder()
      .insert()
      .into(CoursesEntity)
      .values({
        title: createCourseDto.title,
        image: imgLink,
        lang: createCourseDto.lang,
        description: createCourseDto.description,
        course_cat: createCourseDto.category as any,
      })
      .execute()
      .catch(() => {
        throw new HttpException('Category Not Found', HttpStatus.NOT_FOUND);
      });
  }

  async update(id: string, updateCourseDto: UpdateCourseDto, imgLink: any) {
    const course = await CoursesEntity.findOneBy({
      id: id,
    }).catch(() => {
      throw new HttpException('Course Not Found', HttpStatus.NOT_FOUND);
    });
    if (!course) {
      throw new HttpException('Course Not Found', HttpStatus.NOT_FOUND);
    }

    await CoursesEntity.createQueryBuilder()
      .update()
      .set({
        title: updateCourseDto.title || course.title,
        image: imgLink,
        lang: updateCourseDto.lang || course.lang,
        description: updateCourseDto.description || course.description,
        course_cat: updateCourseDto.category || (course.course_cat as any),
      })
      .where({
        id: id,
      })
      .execute()
      .catch(() => {
        throw new HttpException('Bad Request', HttpStatus.BAD_REQUEST);
      });
  }

  async remove(id: string) {
    const course = await CoursesEntity.findOneBy({
      id: id,
    }).catch(() => {
      throw new HttpException('Course Not Found', HttpStatus.NOT_FOUND);
    });
    if (!course) {
      throw new HttpException('Course Not Found', HttpStatus.NOT_FOUND);
    }

    await CoursesEntity.createQueryBuilder()
      .delete()
      .from(CoursesEntity)
      .where({
        id: id,
      })
      .execute()
      .catch(() => {
        throw new HttpException('Bad Request', HttpStatus.BAD_REQUEST);
      });
  }
}
