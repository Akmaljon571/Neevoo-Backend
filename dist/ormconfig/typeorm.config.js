"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.connectDb = void 0;
const courses_entity_1 = require("./../entities/courses.entity");
const dotenv = require("dotenv");
const category_entity_1 = require("../entities/category.entity");
const users_entity_1 = require("../entities/users.entity");
const history_entity_1 = require("../entities/history.entity");
const take_entity_1 = require("../entities/take.entity");
const videos_entity_1 = require("../entities/videos.entity");
dotenv.config();
exports.connectDb = {
    type: 'postgres',
    host: process.env.DB_HOST,
    port: 5432,
    password: process.env.DB_PASSWORD,
    username: process.env.DB_USERNAME,
    database: process.env.DATABASE,
    entities: [
        users_entity_1.UsersEntity,
        category_entity_1.CategoryEntity,
        courses_entity_1.CoursesEntity,
        history_entity_1.HistoryEntity,
        take_entity_1.TakeEntity,
        videos_entity_1.VideosEntity,
    ],
    synchronize: true,
};
//# sourceMappingURL=typeorm.config.js.map