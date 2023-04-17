"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.HistoryService = void 0;
const common_1 = require("@nestjs/common");
const category_entity_1 = require("../../entities/category.entity");
const courses_entity_1 = require("../../entities/courses.entity");
const users_entity_1 = require("../../entities/users.entity");
const videos_entity_1 = require("../../entities/videos.entity");
let HistoryService = class HistoryService {
    async validateUser(userId) {
        const findUser = await users_entity_1.UsersEntity.findOne({
            where: {
                id: userId,
            },
        }).catch(() => {
            throw new common_1.HttpException('User Not Found', common_1.HttpStatus.NOT_FOUND);
        });
        if (!findUser) {
            throw new common_1.HttpException('User Not Found', common_1.HttpStatus.NOT_FOUND);
        }
        return findUser;
    }
    async get(id) {
        const findUser = await this.validateUser(id);
        return await users_entity_1.UsersEntity.find({
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
        const video = (await videos_entity_1.VideosEntity.find()).length;
        const course = (await courses_entity_1.CoursesEntity.find()).length;
        const yonalish = (await category_entity_1.CategoryEntity.find()).length;
        const user = (await users_entity_1.UsersEntity.find()).length;
        return {
            video,
            course,
            yonalish,
            user,
        };
    }
};
HistoryService = __decorate([
    (0, common_1.Injectable)()
], HistoryService);
exports.HistoryService = HistoryService;
//# sourceMappingURL=history.service.js.map