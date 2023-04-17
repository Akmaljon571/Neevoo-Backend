import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { CoursesEntity } from 'src/entities/courses.entity';
import { HistoryEntity } from 'src/entities/history.entity';
import { TakeEntity } from 'src/entities/take.entity';
import { VideosEntity } from 'src/entities/videos.entity';
import { CreateVideoDto } from './dto/create-video.dto';

@Injectable()
export class VideosService {
  async create(createVideoDto: CreateVideoDto, bool: string) {
    const findCourse: CoursesEntity = await CoursesEntity.findOneBy({
      id: createVideoDto.video_course,
    }).catch(() => {
      throw new HttpException('Course Not Found', HttpStatus.NOT_FOUND);
    });

    if (!findCourse) {
      throw new HttpException('Course Not Found', HttpStatus.NOT_FOUND);
    }

    await VideosEntity.createQueryBuilder()
      .insert()
      .into(VideosEntity)
      .values({
        text: createVideoDto.video_text,
        sequence: createVideoDto.sequence,
        link: bool,
        duration: createVideoDto.video_duration,
        course: findCourse,
      })
      .execute()
      .catch(() => {
        throw new HttpException('Bad Request', HttpStatus.BAD_REQUEST);
      });
  }

  async findAll(courseId: string, userId) {
    const findCourse: CoursesEntity = await CoursesEntity.findOneBy({
      id: courseId,
    }).catch(() => {
      throw new HttpException('Course Not Found', HttpStatus.NOT_FOUND);
    });

    if (!findCourse) {
      throw new HttpException('Course Not Found', HttpStatus.NOT_FOUND);
    }

    const courseVideos: any[] = await VideosEntity.find({
      where: {
        course: {
          id: findCourse.id,
        },
      },
      order: {
        sequence: 'ASC',
      },
    });

    const allCourseVideos = [...courseVideos];

    if (userId) {
      const userTakeCourse = await TakeEntity.findOneBy({
        take_user: {
          id: userId,
        },
      }).catch(() => {
        throw new HttpException('User Not Found', HttpStatus.NOT_FOUND);
      });

      if (userTakeCourse?.active) {
        for (let i = 0; i < allCourseVideos.length; i++) {
          allCourseVideos[i].video_active = true;
        }

        await HistoryEntity.createQueryBuilder()
          .insert()
          .into(HistoryEntity)
          .values({
            history_course: findCourse,
            history_user: userId,
          })
          .execute()
          .catch(() => {
            throw new HttpException('Bad Request', HttpStatus.BAD_REQUEST);
          });

        return allCourseVideos;
      } else {
        for (let i = 0; i < allCourseVideos.length; i++) {
          allCourseVideos[i].video_active = false;
          allCourseVideos[i].link = allCourseVideos[i].link
            .split('')
            .map((e, i) => (i % 2 ? 'w' + e : e + 's'))
            .join('');
        }
        return allCourseVideos;
      }
    } else {
      for (let i = 0; i < allCourseVideos.length; i++) {
        allCourseVideos[i].video_active = false;
        allCourseVideos[i].link = allCourseVideos[i].link
          .split('')
          .map((e, i) => (i % 2 ? 'w' + e : e + 's'))
          .join('');
      }
      return allCourseVideos;
    }
  }

  async findOne(videoId: string, userId) {
    const findVideo: any = await VideosEntity.findOneBy({
      id: videoId,
    }).catch(() => {
      throw new HttpException('Video Not Found', HttpStatus.NOT_FOUND);
    });

    if (!findVideo) {
      throw new HttpException('Video Not Found', HttpStatus.NOT_FOUND);
    }

    if (userId) {
      const userTakeCourse = await TakeEntity.findOneBy({
        take_user: {
          id: userId,
        },
      }).catch(() => {
        throw new HttpException('User Not Found', HttpStatus.NOT_FOUND);
      });

      if (userTakeCourse.active) {
        findVideo.video_active = true;

        return findVideo;
      } else {
        findVideo.video_active = false;
        findVideo.link = findVideo.link
          .split('')
          .map((e, i) => (i % 2 ? 'w' + e : e + 's'))
          .join('');
        return findVideo;
      }
    } else {
      findVideo.video_active = false;
      findVideo.link = findVideo.link
        .split('')
        .map((e, i) => (i % 2 ? 'w' + e : e + 's'))
        .join('');
      return findVideo;
    }
  }

  async update(id: string, updateVideoDto: any, link) {
    const findVideo = await VideosEntity.findOne({
      where: { id: id },
    }).catch(() => {
      throw new HttpException('Video Not Found', HttpStatus.NOT_FOUND);
    });

    if (!findVideo) {
      throw new HttpException('Video Not Found', HttpStatus.NOT_FOUND);
    }

    await VideosEntity.createQueryBuilder()
      .update()
      .set({
        text: updateVideoDto.video_text || findVideo.text,
        sequence: updateVideoDto.sequence || findVideo.sequence,
        duration: updateVideoDto.video_duration || findVideo.duration,
        link: link || findVideo.link,
        course: updateVideoDto.video_course || findVideo.course,
      })
      .where({ id: id })
      .execute()
      .catch(() => {
        throw new HttpException('Bad Request', HttpStatus.BAD_REQUEST);
      });
  }

  async delete(id: string) {
    const findVideo = await VideosEntity.findOne({
      where: { id: id },
    }).catch(() => {
      throw new HttpException('Video Not Found', HttpStatus.NOT_FOUND);
    });

    if (!findVideo) {
      throw new HttpException('Video Not Found', HttpStatus.NOT_FOUND);
    }

    await VideosEntity.createQueryBuilder()
      .delete()
      .from(VideosEntity)
      .where({ id: id })
      .execute();
  }
}
