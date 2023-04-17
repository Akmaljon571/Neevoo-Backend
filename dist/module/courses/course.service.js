"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.CourseService = void 0;
const courses_entity_1 = require("./../../entities/courses.entity");
const common_1 = require("@nestjs/common");
const category_entity_1 = require("../../entities/category.entity");
let CourseService = class CourseService {
    date(time) {
        const date = JSON.stringify(time)
            .split('T')[0]
            .split('"')[1]
            .split('-')
            .reverse()
            .join(' ');
        return date;
    }
    async byCategory(cat_id) {
        var _a;
        const [corse] = await category_entity_1.CategoryEntity.find({
            where: {
                id: cat_id,
            },
        }).catch(() => {
            throw new common_1.HttpException('Category Not Found', common_1.HttpStatus.NOT_FOUND);
        });
        const all = await courses_entity_1.CoursesEntity.find({
            order: {
                create_date: 'ASC',
            },
            relations: {
                video: true,
                course_cat: true,
            },
            where: {
                course_cat: corse,
            },
        }).catch(() => {
            throw new common_1.HttpException('Bad Request', common_1.HttpStatus.BAD_REQUEST);
        });
        const result = all;
        for (let i = 0; i < all.length; i++) {
            result[i].video_count = all[i].video.length;
            result[i].create = this.date(all[i].create_date);
            result[i].category = (_a = all[i].course_cat) === null || _a === void 0 ? void 0 : _a.title;
            delete result[i].video;
            delete result[i].course_cat;
            delete result[i].create_date;
        }
        return result;
    }
    async searchTitle(name) {
        const title = name.toLowerCase().trim();
        let tasks = this.findAll();
        if (title) {
            tasks = (await tasks).filter((task) => task.title.toLowerCase().includes(title));
        }
        return tasks;
    }
    async findAll() {
        var _a;
        const all = await courses_entity_1.CoursesEntity.find({
            order: {
                create_date: 'ASC',
            },
            relations: {
                video: true,
                course_cat: true,
            },
        }).catch(() => {
            throw new common_1.HttpException('BAD GATEWAY', common_1.HttpStatus.BAD_GATEWAY);
        });
        const result = all;
        for (let i = 0; i < all.length; i++) {
            result[i].video_count = all[i].video.length;
            result[i].create = this.date(all[i].create_date);
            result[i].category = (_a = all[i].course_cat) === null || _a === void 0 ? void 0 : _a.title;
            delete result[i].video;
            delete result[i].course_cat;
        }
        return all;
    }
    async create(createCourseDto, imgLink) {
        await courses_entity_1.CoursesEntity.createQueryBuilder()
            .insert()
            .into(courses_entity_1.CoursesEntity)
            .values({
            title: createCourseDto.title,
            image: imgLink,
            lang: createCourseDto.lang,
            description: createCourseDto.description,
            course_cat: createCourseDto.category,
        })
            .execute()
            .catch(() => {
            throw new common_1.HttpException('Category Not Found', common_1.HttpStatus.NOT_FOUND);
        });
    }
    async update(id, updateCourseDto, imgLink) {
        const course = await courses_entity_1.CoursesEntity.findOneBy({
            id: id,
        }).catch(() => {
            throw new common_1.HttpException('Course Not Found', common_1.HttpStatus.NOT_FOUND);
        });
        if (!course) {
            throw new common_1.HttpException('Course Not Found', common_1.HttpStatus.NOT_FOUND);
        }
        await courses_entity_1.CoursesEntity.createQueryBuilder()
            .update()
            .set({
            title: updateCourseDto.title || course.title,
            image: imgLink,
            lang: updateCourseDto.lang || course.lang,
            description: updateCourseDto.description || course.description,
            course_cat: updateCourseDto.category || course.course_cat,
        })
            .where({
            id: id,
        })
            .execute()
            .catch(() => {
            throw new common_1.HttpException('Bad Request', common_1.HttpStatus.BAD_REQUEST);
        });
    }
    async remove(id) {
        const course = await courses_entity_1.CoursesEntity.findOneBy({
            id: id,
        }).catch(() => {
            throw new common_1.HttpException('Course Not Found', common_1.HttpStatus.NOT_FOUND);
        });
        if (!course) {
            throw new common_1.HttpException('Course Not Found', common_1.HttpStatus.NOT_FOUND);
        }
        await courses_entity_1.CoursesEntity.createQueryBuilder()
            .delete()
            .from(courses_entity_1.CoursesEntity)
            .where({
            id: id,
        })
            .execute()
            .catch(() => {
            throw new common_1.HttpException('Bad Request', common_1.HttpStatus.BAD_REQUEST);
        });
    }
};
CourseService = __decorate([
    (0, common_1.Injectable)()
], CourseService);
exports.CourseService = CourseService;
//# sourceMappingURL=course.service.js.map