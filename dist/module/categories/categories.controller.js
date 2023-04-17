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
exports.CategoriesController = void 0;
const common_1 = require("@nestjs/common");
const platform_express_1 = require("@nestjs/platform-express");
const swagger_1 = require("@nestjs/swagger");
const token_middleware_1 = require("../../middleWare/token.middleware");
const google_cloud_1 = require("../../utils/google-cloud");
const categories_service_1 = require("./categories.service");
const create_category_dto_1 = require("./dto/create-category.dto");
const update_category_dto_1 = require("./dto/update-category.dto");
let CategoriesController = class CategoriesController {
    constructor(categoriesService, verifyToken) {
        this.categoriesService = categoriesService;
        this.verifyToken = verifyToken;
    }
    async uploadfile(file, createCategoryDto, headers) {
        const admin = await this.verifyToken.verifyAdmin(headers);
        if (admin) {
            const cat_link = (0, google_cloud_1.googleCloud)(file);
            return await this.categoriesService.create(createCategoryDto, cat_link);
        }
    }
    findAll() {
        return this.categoriesService.findAll();
    }
    findByTitle(filterDto) {
        if (Object.keys(filterDto).length) {
            return this.categoriesService.searchTitle(filterDto);
        }
        else {
            return this.categoriesService.findAll();
        }
    }
    async uploadUpdateFile(id, file, body, headers) {
        await this.verifyToken.verifyAdmin(headers);
        if (file) {
            const cat_link = await (0, google_cloud_1.googleCloud)(file);
            return await this.categoriesService.update(id, body, cat_link);
        }
        return await this.categoriesService.update(id, body, undefined);
    }
    async remove(id, headers) {
        const admin = await this.verifyToken.verifyAdmin(headers);
        if (admin) {
            return await this.categoriesService.remove(id);
        }
    }
};
__decorate([
    (0, common_1.Post)('create'),
    (0, common_1.HttpCode)(common_1.HttpStatus.CREATED),
    (0, swagger_1.ApiBody)({
        schema: {
            type: 'object',
            required: ['file', 'title', 'description'],
            properties: {
                file: {
                    type: 'string',
                    format: 'binary',
                },
                title: {
                    type: 'string',
                },
                description: {
                    type: 'string',
                },
            },
        },
    }),
    (0, swagger_1.ApiConsumes)('multipart/form-data'),
    (0, swagger_1.ApiBadRequestResponse)(),
    (0, swagger_1.ApiCreatedResponse)(),
    (0, common_1.UseInterceptors)((0, platform_express_1.FileInterceptor)('file')),
    (0, swagger_1.ApiHeader)({
        name: 'autharization',
        description: 'Autharization',
        required: true,
    }),
    __param(0, (0, common_1.UploadedFile)()),
    __param(1, (0, common_1.Body)()),
    __param(2, (0, common_1.Headers)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, create_category_dto_1.CreateCategoryDto, Object]),
    __metadata("design:returntype", Promise)
], CategoriesController.prototype, "uploadfile", null);
__decorate([
    (0, common_1.HttpCode)(common_1.HttpStatus.OK),
    (0, swagger_1.ApiNoContentResponse)(),
    (0, swagger_1.ApiNotFoundResponse)(),
    (0, common_1.Get)('list'),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", void 0)
], CategoriesController.prototype, "findAll", null);
__decorate([
    (0, common_1.Get)('/:search'),
    (0, swagger_1.ApiBadRequestResponse)(),
    (0, swagger_1.ApiNotFoundResponse)(),
    (0, swagger_1.ApiOkResponse)(),
    __param(0, (0, common_1.Param)('search')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", void 0)
], CategoriesController.prototype, "findByTitle", null);
__decorate([
    (0, common_1.Patch)('update/:id'),
    (0, swagger_1.ApiBody)({
        schema: {
            type: 'object',
            properties: {
                file: {
                    type: 'string',
                    format: 'binary',
                    default: 'dsfsgf',
                },
                title: {
                    type: 'string',
                    default: 'Node.js',
                },
                description: {
                    type: 'string',
                    default: 'Zo`r dasturlash tili',
                },
            },
        },
    }),
    (0, swagger_1.ApiConsumes)('multipart/form-data'),
    (0, swagger_1.ApiBadRequestResponse)(),
    (0, common_1.UseInterceptors)((0, platform_express_1.FileInterceptor)('file')),
    (0, swagger_1.ApiHeader)({
        name: 'autharization',
        description: 'Autharization',
        required: true,
    }),
    (0, common_1.HttpCode)(common_1.HttpStatus.NO_CONTENT),
    (0, swagger_1.ApiNoContentResponse)(),
    (0, swagger_1.ApiBadRequestResponse)(),
    (0, swagger_1.ApiNoContentResponse)(),
    __param(0, (0, common_1.Param)('id')),
    __param(1, (0, common_1.UploadedFile)()),
    __param(2, (0, common_1.Body)()),
    __param(3, (0, common_1.Headers)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, Object, update_category_dto_1.UpdateCategoryDto, Object]),
    __metadata("design:returntype", Promise)
], CategoriesController.prototype, "uploadUpdateFile", null);
__decorate([
    (0, common_1.HttpCode)(common_1.HttpStatus.NO_CONTENT),
    (0, swagger_1.ApiNoContentResponse)(),
    (0, swagger_1.ApiNotFoundResponse)(),
    (0, swagger_1.ApiUnprocessableEntityResponse)(),
    (0, swagger_1.ApiForbiddenResponse)(),
    (0, common_1.Delete)('/delete/:id'),
    (0, swagger_1.ApiHeader)({
        name: 'autharization',
        description: 'Autharization',
        required: true,
    }),
    __param(0, (0, common_1.Param)('id')),
    __param(1, (0, common_1.Headers)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, Object]),
    __metadata("design:returntype", Promise)
], CategoriesController.prototype, "remove", null);
CategoriesController = __decorate([
    (0, common_1.Controller)('categories'),
    (0, swagger_1.ApiTags)('Categories'),
    __metadata("design:paramtypes", [categories_service_1.CategoriesService,
        token_middleware_1.TokenMiddleware])
], CategoriesController);
exports.CategoriesController = CategoriesController;
//# sourceMappingURL=categories.controller.js.map