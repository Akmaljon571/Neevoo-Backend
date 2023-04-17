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
exports.TakeController = void 0;
const common_1 = require("@nestjs/common");
const take_service_1 = require("./take.service");
const create_take_dto_1 = require("./dto/create-take.dto");
const swagger_1 = require("@nestjs/swagger");
const token_middleware_1 = require("../../middleWare/token.middleware");
let TakeController = class TakeController {
    constructor(takeService, veridfyToken) {
        this.takeService = takeService;
        this.veridfyToken = veridfyToken;
    }
    async findAll(headers) {
        const userId = await this.veridfyToken.verifyAdmin(headers);
        if (userId) {
            return await this.takeService.findAll();
        }
    }
    async create(body, headers) {
        const userId = await this.veridfyToken.verifyAdmin(headers);
        if (userId) {
            await this.takeService.create(body);
        }
    }
    async remove(id, headers) {
        const userId = await this.veridfyToken.verifyAdmin(headers);
        if (userId) {
            await this.takeService.remove(id);
        }
    }
};
__decorate([
    (0, common_1.Get)('/all'),
    (0, swagger_1.ApiOkResponse)(),
    (0, swagger_1.ApiNotFoundResponse)(),
    (0, swagger_1.ApiBadRequestResponse)(),
    (0, swagger_1.ApiHeader)({
        name: 'autharization',
        description: 'Admin token',
        required: true,
    }),
    (0, common_1.HttpCode)(common_1.HttpStatus.OK),
    __param(0, (0, common_1.Headers)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], TakeController.prototype, "findAll", null);
__decorate([
    (0, common_1.Post)('/create'),
    (0, swagger_1.ApiBadRequestResponse)(),
    (0, swagger_1.ApiCreatedResponse)(),
    (0, swagger_1.ApiNotFoundResponse)(),
    (0, swagger_1.ApiHeader)({
        name: 'autharization',
        description: 'Admin token',
        required: true,
    }),
    (0, common_1.HttpCode)(common_1.HttpStatus.CREATED),
    __param(0, (0, common_1.Body)()),
    __param(1, (0, common_1.Headers)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [create_take_dto_1.CreateTakeDto, Object]),
    __metadata("design:returntype", Promise)
], TakeController.prototype, "create", null);
__decorate([
    (0, common_1.Delete)('/delete/:id'),
    (0, swagger_1.ApiBadRequestResponse)(),
    (0, swagger_1.ApiNoContentResponse)(),
    (0, swagger_1.ApiNotFoundResponse)(),
    (0, swagger_1.ApiHeader)({
        name: 'autharization',
        description: 'Admin token',
        required: true,
    }),
    (0, common_1.HttpCode)(common_1.HttpStatus.NO_CONTENT),
    __param(0, (0, common_1.Param)('id')),
    __param(1, (0, common_1.Headers)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, Object]),
    __metadata("design:returntype", Promise)
], TakeController.prototype, "remove", null);
TakeController = __decorate([
    (0, common_1.Controller)('take'),
    (0, swagger_1.ApiTags)('Take'),
    __metadata("design:paramtypes", [take_service_1.TakeService,
        token_middleware_1.TokenMiddleware])
], TakeController);
exports.TakeController = TakeController;
//# sourceMappingURL=take.controller.js.map