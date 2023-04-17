"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.AppModule = void 0;
const dotenv = require("dotenv");
const common_1 = require("@nestjs/common");
const typeorm_1 = require("@nestjs/typeorm");
const config_1 = require("@nestjs/config");
const config_2 = require("./config");
const typeorm_config_1 = require("./ormconfig/typeorm.config");
const take_module_1 = require("./module/take/take.module");
const categories_module_1 = require("./module/categories/categories.module");
const take_middleware_1 = require("./middleWare/take.middleware");
const history_module_1 = require("./module/history/history.module");
const videos_module_1 = require("./module/videos/videos.module");
const users_module_1 = require("./module/users/users.module");
const course_module_1 = require("./module/courses/course.module");
const nestjs_redis_1 = require("@liaoliaots/nestjs-redis");
dotenv.config();
let AppModule = class AppModule {
    configure(consumer) {
        consumer
            .apply(take_middleware_1.TakeMiddleware)
            .forRoutes({ path: '*', method: common_1.RequestMethod.ALL });
    }
};
AppModule = __decorate([
    (0, common_1.Module)({
        imports: [
            config_1.ConfigModule.forRoot(config_2.config),
            typeorm_1.TypeOrmModule.forRoot(typeorm_config_1.connectDb),
            take_module_1.TakeModule,
            categories_module_1.CategoriesModule,
            history_module_1.HistoryModule,
            course_module_1.CourseModule,
            nestjs_redis_1.RedisModule.forRoot({
                config: {
                    host: 'localhost',
                    port: 6379,
                    password: '',
                },
            }),
            videos_module_1.VideosModule,
            users_module_1.UsersModule,
            course_module_1.CourseModule,
        ],
    })
], AppModule);
exports.AppModule = AppModule;
//# sourceMappingURL=app.module.js.map