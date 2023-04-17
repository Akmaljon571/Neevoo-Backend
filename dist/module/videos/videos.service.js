"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.VideosService = void 0;
const common_1 = require("@nestjs/common");
const courses_entity_1 = require("../../entities/courses.entity");
const history_entity_1 = require("../../entities/history.entity");
const take_entity_1 = require("../../entities/take.entity");
const videos_entity_1 = require("../../entities/videos.entity");
let VideosService = class VideosService {
    async create(createVideoDto, bool) {
        const findCourse = await courses_entity_1.CoursesEntity.findOneBy({
            id: createVideoDto.video_course,
        }).catch(() => {
            throw new common_1.HttpException('Course Not Found', common_1.HttpStatus.NOT_FOUND);
        });
        if (!findCourse) {
            throw new common_1.HttpException('Course Not Found', common_1.HttpStatus.NOT_FOUND);
        }
        await videos_entity_1.VideosEntity.createQueryBuilder()
            .insert()
            .into(videos_entity_1.VideosEntity)
            .values({
            text: createVideoDto.video_text,
            sequence: createVideoDto.sequence,
            link: bool,
            duration: createVideoDto.video_duration,
            course: findCourse,
        })
            .execute()
            .catch(() => {
            throw new common_1.HttpException('Bad Request', common_1.HttpStatus.BAD_REQUEST);
        });
    }
    async findAll(courseId, userId) {
        const findCourse = await courses_entity_1.CoursesEntity.findOneBy({
            id: courseId,
        }).catch(() => {
            throw new common_1.HttpException('Course Not Found', common_1.HttpStatus.NOT_FOUND);
        });
        if (!findCourse) {
            throw new common_1.HttpException('Course Not Found', common_1.HttpStatus.NOT_FOUND);
        }
        const courseVideos = await videos_entity_1.VideosEntity.find({
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
            const userTakeCourse = await take_entity_1.TakeEntity.findOneBy({
                take_user: {
                    id: userId,
                },
            }).catch(() => {
                throw new common_1.HttpException('User Not Found', common_1.HttpStatus.NOT_FOUND);
            });
            if (userTakeCourse === null || userTakeCourse === void 0 ? void 0 : userTakeCourse.active) {
                for (let i = 0; i < allCourseVideos.length; i++) {
                    allCourseVideos[i].video_active = true;
                }
                await history_entity_1.HistoryEntity.createQueryBuilder()
                    .insert()
                    .into(history_entity_1.HistoryEntity)
                    .values({
                    history_course: findCourse,
                    history_user: userId,
                })
                    .execute()
                    .catch(() => {
                    throw new common_1.HttpException('Bad Request', common_1.HttpStatus.BAD_REQUEST);
                });
                return allCourseVideos;
            }
            else {
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
        else {
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
    async findOne(videoId, userId) {
        const findVideo = await videos_entity_1.VideosEntity.findOneBy({
            id: videoId,
        }).catch(() => {
            throw new common_1.HttpException('Video Not Found', common_1.HttpStatus.NOT_FOUND);
        });
        if (!findVideo) {
            throw new common_1.HttpException('Video Not Found', common_1.HttpStatus.NOT_FOUND);
        }
        if (userId) {
            const userTakeCourse = await take_entity_1.TakeEntity.findOneBy({
                take_user: {
                    id: userId,
                },
            }).catch(() => {
                throw new common_1.HttpException('User Not Found', common_1.HttpStatus.NOT_FOUND);
            });
            if (userTakeCourse.active) {
                findVideo.video_active = true;
                return findVideo;
            }
            else {
                findVideo.video_active = false;
                findVideo.link = findVideo.link
                    .split('')
                    .map((e, i) => (i % 2 ? 'w' + e : e + 's'))
                    .join('');
                return findVideo;
            }
        }
        else {
            findVideo.video_active = false;
            findVideo.link = findVideo.link
                .split('')
                .map((e, i) => (i % 2 ? 'w' + e : e + 's'))
                .join('');
            return findVideo;
        }
    }
    async update(id, updateVideoDto, link) {
        const findVideo = await videos_entity_1.VideosEntity.findOne({
            where: { id: id },
        }).catch(() => {
            throw new common_1.HttpException('Video Not Found', common_1.HttpStatus.NOT_FOUND);
        });
        if (!findVideo) {
            throw new common_1.HttpException('Video Not Found', common_1.HttpStatus.NOT_FOUND);
        }
        await videos_entity_1.VideosEntity.createQueryBuilder()
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
            throw new common_1.HttpException('Bad Request', common_1.HttpStatus.BAD_REQUEST);
        });
    }
    async delete(id) {
        const findVideo = await videos_entity_1.VideosEntity.findOne({
            where: { id: id },
        }).catch(() => {
            throw new common_1.HttpException('Video Not Found', common_1.HttpStatus.NOT_FOUND);
        });
        if (!findVideo) {
            throw new common_1.HttpException('Video Not Found', common_1.HttpStatus.NOT_FOUND);
        }
        await videos_entity_1.VideosEntity.createQueryBuilder()
            .delete()
            .from(videos_entity_1.VideosEntity)
            .where({ id: id })
            .execute();
    }
};
VideosService = __decorate([
    (0, common_1.Injectable)()
], VideosService);
exports.VideosService = VideosService;
//# sourceMappingURL=videos.service.js.map