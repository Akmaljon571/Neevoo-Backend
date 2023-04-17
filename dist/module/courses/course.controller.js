"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.CourseController = void 0;
const platform_express_1 = require("@nestjs/platform-express");
const create_course_dto_1 = require("./dto/create-course.dto");
const google_cloud_1 = require("./../../utils/google-cloud");
const token_middleware_1 = require("../../middleWare/token.middleware");
const common_1 = require("@nestjs/common");
const course_service_1 = require("./course.service");
const update_course_dto_1 = require("./dto/update-course.dto");
const swagger_1 = require("@nestjs/swagger");
const decorators_1 = require("@nestjs/common/decorators");
let CourseController = class CourseController {
    constructor(courseService, verifyToken) {
        this.courseService = courseService;
        this.verifyToken = verifyToken;
    }
    async create(createCourseDto, file, headers) {
        await this.verifyToken.verifyAdmin(headers);
        if (file) {
            const imgLink = (0, google_cloud_1.googleCloud)(file);
            return this.courseService.create(createCourseDto, imgLink);
        }
        return this.courseService.create(createCourseDto, undefined);
    }
    findAll() {
        return this.courseService.findAll();
    }
    findOne(cat_id) {
        return this.courseService.byCategory(cat_id);
    }
    findByTitle(title) {
        if (Object.keys(title).length) {
            return this.courseService.searchTitle(title);
        }
        else {
            return this.courseService.findAll();
        }
    }
    async update(id, updateCourseDto, file, headers) {
        await this.verifyToken.verifyAdmin(headers);
        if (file) {
            const imgLink = await (0, google_cloud_1.googleCloud)(file);
            return await this.courseService.update(id, updateCourseDto, imgLink);
        }
        return await this.courseService.update(id, updateCourseDto, undefined);
    }
    async remove(id, headers) {
        if (await this.verifyToken.verifyAdmin(headers)) {
            return await this.courseService.remove(id);
        }
    }
};
__decorate([
    (0, common_1.Post)('/create'),
    (0, common_1.HttpCode)(common_1.HttpStatus.CREATED),
    (0, swagger_1.ApiBadRequestResponse)(),
    (0, swagger_1.ApiNotFoundResponse)(),
    (0, swagger_1.ApiCreatedResponse)(),
    (0, swagger_1.ApiBody)({
        schema: {
            type: 'object',
            required: ['title', 'file', 'lang', 'description', 'category'],
            properties: {
                file: {
                    type: 'string',
                    format: 'binary',
                },
                title: {
                    type: 'string',
                    default: 'Express.js',
                },
                lang: {
                    type: 'string',
                    default: 'uz',
                },
                description: {
                    type: 'string',
                    default: 'Express good',
                },
                category: {
                    type: 'number',
                    default: 'af33daf0-c68d-4c74-a0d0-d2f0b1c1a7aa',
                },
            },
        },
    }),
    (0, swagger_1.ApiHeader)({
        name: 'autharization',
        description: 'Admin token',
        required: true,
    }),
    (0, swagger_1.ApiConsumes)('multipart/form-data'),
    (0, decorators_1.UseInterceptors)((0, platform_express_1.FileInterceptor)('file')),
    __param(0, (0, common_1.Body)()),
    __param(1, (0, decorators_1.UploadedFile)()),
    __param(2, (0, decorators_1.Headers)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [create_course_dto_1.CreateCourseDto, Object, Object]),
    __metadata("design:returntype", Promise)
], CourseController.prototype, "create", null);
__decorate([
    (0, common_1.Get)(),
    (0, common_1.HttpCode)(common_1.HttpStatus.OK),
    (0, swagger_1.ApiBadRequestResponse)(),
    (0, swagger_1.ApiNotFoundResponse)(),
    (0, swagger_1.ApiOkResponse)(),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", void 0)
], CourseController.prototype, "findAll", null);
__decorate([
    (0, common_1.Get)('/bycategory/:id'),
    (0, common_1.HttpCode)(common_1.HttpStatus.OK),
    (0, swagger_1.ApiBadRequestResponse)(),
    (0, swagger_1.ApiNotFoundResponse)(),
    (0, swagger_1.ApiOkResponse)(),
    __param(0, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", void 0)
], CourseController.prototype, "findOne", null);
__decorate([
    (0, common_1.Get)('/:search'),
    (0, swagger_1.ApiBadRequestResponse)(),
    (0, swagger_1.ApiNotFoundResponse)(),
    (0, swagger_1.ApiOkResponse)(),
    __param(0, (0, common_1.Param)('search')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", void 0)
], CourseController.prototype, "findByTitle", null);
__decorate([
    (0, common_1.Patch)('/update/:id'),
    (0, swagger_1.ApiBody)({
        schema: {
            type: 'object',
            properties: {
                title: {
                    type: 'string',
                },
                file: {
                    type: 'string',
                    format: 'binary',
                },
                lang: {
                    type: 'string',
                },
                description: {
                    type: 'string',
                },
                category: {
                    type: 'string',
                },
            },
        },
    }),
    (0, common_1.HttpCode)(common_1.HttpStatus.NO_CONTENT),
    (0, swagger_1.ApiConsumes)('multipart/form-data'),
    (0, swagger_1.ApiBadRequestResponse)(),
    (0, swagger_1.ApiNotFoundResponse)(),
    (0, swagger_1.ApiNoContentResponse)(),
    (0, decorators_1.UseInterceptors)((0, platform_express_1.FileInterceptor)('file')),
    (0, swagger_1.ApiHeader)({
        name: 'autharization',
        description: 'Admin token',
        required: true,
    }),
    __param(0, (0, common_1.Param)('id')),
    __param(1, (0, common_1.Body)()),
    __param(2, (0, decorators_1.UploadedFile)()),
    __param(3, (0, decorators_1.Headers)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, update_course_dto_1.UpdateCourseDto, Object, Object]),
    __metadata("design:returntype", Promise)
], CourseController.prototype, "update", null);
__decorate([
    (0, common_1.Delete)('/delete/:id'),
    (0, common_1.HttpCode)(common_1.HttpStatus.NO_CONTENT),
    (0, swagger_1.ApiBadRequestResponse)(),
    (0, swagger_1.ApiNotFoundResponse)(),
    (0, swagger_1.ApiNoContentResponse)(),
    (0, swagger_1.ApiUnprocessableEntityResponse)(),
    (0, swagger_1.ApiForbiddenResponse)(),
    (0, swagger_1.ApiHeader)({
        name: 'autharization',
        description: 'Admin token',
        required: true,
    }),
    __param(0, (0, common_1.Param)('id')),
    __param(1, (0, decorators_1.Headers)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, Object]),
    __metadata("design:returntype", Promise)
], CourseController.prototype, "remove", null);
CourseController = __decorate([
    (0, common_1.Controller)('courses'),
    (0, swagger_1.ApiTags)('Course'),
    __metadata("design:paramtypes", [course_service_1.CourseService,
        token_middleware_1.TokenMiddleware])
], CourseController);
exports.CourseController = CourseController;
//# sourceMappingURL=course.controller.js.map