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
exports.VideosController = void 0;
const common_1 = require("@nestjs/common");
const platform_express_1 = require("@nestjs/platform-express");
const swagger_1 = require("@nestjs/swagger");
const token_middleware_1 = require("../../middleWare/token.middleware");
const google_cloud_1 = require("../../utils/google-cloud");
const create_video_dto_1 = require("./dto/create-video.dto");
const update_video_dto_1 = require("./dto/update-video.dto");
const videos_service_1 = require("./videos.service");
let VideosController = class VideosController {
    constructor(videoService, VerifyToken) {
        this.videoService = videoService;
        this.VerifyToken = VerifyToken;
    }
    async uploadVideo(file, createVideoDto, header) {
        const adminId = await this.VerifyToken.verifyAdmin(header);
        if (adminId) {
            const bool = await (0, google_cloud_1.googleCloud)(file);
            if (bool) {
                return await this.videoService.create(createVideoDto, bool);
            }
        }
    }
    async findAll(course, headers) {
        if (headers === null || headers === void 0 ? void 0 : headers.autharization) {
            const userId = await this.VerifyToken.verifyUser(headers);
            if (userId) {
                return await this.videoService.findAll(course, userId);
            }
        }
        else {
            return await this.videoService.findAll(course, false);
        }
    }
    async findOne(videoId, headers) {
        if (headers === null || headers === void 0 ? void 0 : headers.autharization) {
            const userId = await this.VerifyToken.verifyUser(headers);
            if (userId) {
                return await this.videoService.findOne(videoId, userId);
            }
        }
        else {
            return await this.videoService.findOne(videoId, false);
        }
    }
    async update(id, header, updateVideoDto, file) {
        await this.VerifyToken.verifyAdmin(header);
        if (file) {
            const link = await (0, google_cloud_1.googleCloud)(file);
            if (link) {
                await this.videoService.update(id, updateVideoDto, link);
            }
        }
        else {
            await this.videoService.update(id, updateVideoDto, false);
        }
    }
    async delete(id, header) {
        const adminId = await this.VerifyToken.verifyAdmin(header);
        if (adminId) {
            await this.videoService.delete(id);
        }
    }
};
__decorate([
    (0, common_1.Post)('create'),
    (0, common_1.HttpCode)(common_1.HttpStatus.CREATED),
    (0, swagger_1.ApiBody)({
        schema: {
            type: 'object',
            required: [
                'file',
                'video_text',
                'video_duration',
                'sequence',
                'video_course',
            ],
            properties: {
                file: {
                    type: 'string',
                    format: 'binary',
                },
                video_text: {
                    type: 'string',
                    default: '3-dars',
                },
                video_duration: {
                    type: 'string',
                    default: '30:00',
                },
                sequence: {
                    type: 'number',
                    default: 4,
                },
                video_course: {
                    type: 'string',
                    default: 'uuid',
                },
            },
        },
    }),
    (0, swagger_1.ApiConsumes)('multipart/form-data'),
    (0, swagger_1.ApiOperation)({ summary: 'Attendance Punch In' }),
    (0, swagger_1.ApiBadRequestResponse)(),
    (0, swagger_1.ApiNotFoundResponse)(),
    (0, swagger_1.ApiHeader)({
        name: 'autharization',
        description: 'Admin token',
        required: true,
    }),
    (0, common_1.UseInterceptors)((0, platform_express_1.FileInterceptor)('file')),
    __param(0, (0, common_1.UploadedFile)()),
    __param(1, (0, common_1.Body)()),
    __param(2, (0, common_1.Headers)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, create_video_dto_1.CreateVideoDto, Object]),
    __metadata("design:returntype", Promise)
], VideosController.prototype, "uploadVideo", null);
__decorate([
    (0, common_1.Get)('/by_course/:id'),
    (0, swagger_1.ApiOkResponse)(),
    (0, swagger_1.ApiNotFoundResponse)(),
    (0, swagger_1.ApiBadRequestResponse)(),
    (0, swagger_1.ApiHeader)({
        name: 'autharization',
        description: 'User token',
        required: false,
    }),
    (0, common_1.HttpCode)(common_1.HttpStatus.OK),
    __param(0, (0, common_1.Param)('id')),
    __param(1, (0, common_1.Headers)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, Object]),
    __metadata("design:returntype", Promise)
], VideosController.prototype, "findAll", null);
__decorate([
    (0, common_1.Get)(':id'),
    (0, swagger_1.ApiOkResponse)(),
    (0, swagger_1.ApiNotFoundResponse)(),
    (0, swagger_1.ApiBadRequestResponse)(),
    (0, swagger_1.ApiHeader)({
        name: 'autharization',
        description: 'User token',
        required: false,
    }),
    (0, common_1.HttpCode)(common_1.HttpStatus.OK),
    __param(0, (0, common_1.Param)('id')),
    __param(1, (0, common_1.Headers)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, Object]),
    __metadata("design:returntype", Promise)
], VideosController.prototype, "findOne", null);
__decorate([
    (0, common_1.Patch)('/update/:id'),
    (0, common_1.HttpCode)(common_1.HttpStatus.NO_CONTENT),
    (0, swagger_1.ApiBody)({
        schema: {
            type: 'object',
            properties: {
                file: {
                    type: 'string',
                    format: 'binary',
                },
                video_text: {
                    type: 'string',
                    default: '3-dars',
                },
                video_duration: {
                    type: 'string',
                    default: '30:00',
                },
                sequence: {
                    type: 'number',
                    default: 4,
                },
                video_course: {
                    type: 'string',
                    default: 'uuid',
                },
            },
        },
    }),
    (0, swagger_1.ApiConsumes)('multipart/form-data'),
    (0, swagger_1.ApiOperation)({ summary: 'Attendance Punch In' }),
    (0, swagger_1.ApiBadRequestResponse)(),
    (0, swagger_1.ApiNotFoundResponse)(),
    (0, swagger_1.ApiHeader)({
        name: 'autharization',
        description: 'Admin token',
        required: false,
    }),
    (0, common_1.UseInterceptors)((0, platform_express_1.FileInterceptor)('file')),
    __param(0, (0, common_1.Param)('id')),
    __param(1, (0, common_1.Headers)()),
    __param(2, (0, common_1.Body)()),
    __param(3, (0, common_1.UploadedFile)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, Object, update_video_dto_1.UpdateVideoDto, Object]),
    __metadata("design:returntype", Promise)
], VideosController.prototype, "update", null);
__decorate([
    (0, common_1.Delete)('/delete/:id'),
    (0, common_1.HttpCode)(common_1.HttpStatus.NO_CONTENT),
    (0, swagger_1.ApiBadRequestResponse)(),
    (0, swagger_1.ApiNotFoundResponse)(),
    (0, swagger_1.ApiHeader)({
        name: 'autharization',
        description: 'Admin token',
        required: true,
    }),
    __param(0, (0, common_1.Param)('id')),
    __param(1, (0, common_1.Headers)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, Object]),
    __metadata("design:returntype", Promise)
], VideosController.prototype, "delete", null);
VideosController = __decorate([
    (0, common_1.Controller)('video'),
    (0, swagger_1.ApiTags)('Videos'),
    __metadata("design:paramtypes", [videos_service_1.VideosService,
        token_middleware_1.TokenMiddleware])
], VideosController);
exports.VideosController = VideosController;
//# sourceMappingURL=videos.controller.js.map