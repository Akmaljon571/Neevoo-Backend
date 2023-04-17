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
exports.UsersController = void 0;
const common_1 = require("@nestjs/common");
const swagger_1 = require("@nestjs/swagger");
const users_service_1 = require("./users.service");
const update_user_dto_1 = require("./dto/update-user.dto");
const registr_1 = require("./dto/registr");
const parol_1 = require("./dto/parol");
const parol_email_1 = require("./dto/parol_email");
let UsersController = class UsersController {
    constructor(usersService) {
        this.usersService = usersService;
    }
    async registr(body) {
        return await this.usersService.registr(body);
    }
    async registrEmail(param) {
        return await this.usersService.registr_email(param);
    }
    async parol(body) {
        return await this.usersService.parol(body);
    }
    async parolEmail(param, body) {
        return await this.usersService.parol_email(param, body);
    }
    login(body) {
        return this.usersService.login(body);
    }
    getAdmin(headers) {
        return this.usersService.getAdmin(headers);
    }
    getOne(headers) {
        return this.usersService.getOne(headers);
    }
    update(headers, body) {
        return this.usersService.update(headers, body);
    }
    deleteUser(headers) {
        return this.usersService.deleteUser(headers);
    }
};
__decorate([
    (0, common_1.Post)('/registr'),
    (0, swagger_1.ApiBadRequestResponse)(),
    (0, swagger_1.ApiOkResponse)(),
    (0, swagger_1.ApiNotFoundResponse)(),
    (0, common_1.HttpCode)(common_1.HttpStatus.OK),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [registr_1.RegistrUserDto]),
    __metadata("design:returntype", Promise)
], UsersController.prototype, "registr", null);
__decorate([
    (0, common_1.Get)('/registr/email/:code'),
    (0, swagger_1.ApiBadRequestResponse)(),
    (0, swagger_1.ApiOkResponse)(),
    (0, swagger_1.ApiNotFoundResponse)(),
    (0, swagger_1.ApiUnprocessableEntityResponse)(),
    (0, common_1.HttpCode)(common_1.HttpStatus.OK),
    __param(0, (0, common_1.Param)('code')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], UsersController.prototype, "registrEmail", null);
__decorate([
    (0, common_1.Post)('/parol'),
    (0, swagger_1.ApiBadRequestResponse)(),
    (0, swagger_1.ApiNotFoundResponse)(),
    (0, swagger_1.ApiOkResponse)(),
    (0, common_1.HttpCode)(common_1.HttpStatus.OK),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [parol_1.ParolUserDto]),
    __metadata("design:returntype", Promise)
], UsersController.prototype, "parol", null);
__decorate([
    (0, common_1.Post)('/parol/email/:code'),
    (0, swagger_1.ApiBadRequestResponse)(),
    (0, swagger_1.ApiNotFoundResponse)(),
    (0, swagger_1.ApiOkResponse)(),
    (0, common_1.HttpCode)(common_1.HttpStatus.OK),
    __param(0, (0, common_1.Param)('code')),
    __param(1, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, parol_email_1.ParolEmailUserDto]),
    __metadata("design:returntype", Promise)
], UsersController.prototype, "parolEmail", null);
__decorate([
    (0, swagger_1.ApiBadRequestResponse)(),
    (0, common_1.HttpCode)(common_1.HttpStatus.OK),
    (0, common_1.Post)('/login'),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [registr_1.RegistrUserDto]),
    __metadata("design:returntype", void 0)
], UsersController.prototype, "login", null);
__decorate([
    (0, common_1.Get)('/admin/getall'),
    (0, swagger_1.ApiHeader)({
        name: 'autharization',
        description: 'Admin token',
        required: true,
    }),
    (0, swagger_1.ApiOkResponse)(),
    (0, swagger_1.ApiNotFoundResponse)(),
    (0, swagger_1.ApiBadRequestResponse)(),
    (0, common_1.HttpCode)(common_1.HttpStatus.OK),
    __param(0, (0, common_1.Headers)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", void 0)
], UsersController.prototype, "getAdmin", null);
__decorate([
    (0, common_1.Get)('/one'),
    (0, swagger_1.ApiHeader)({
        name: 'autharization',
        description: 'User token',
        required: true,
    }),
    (0, swagger_1.ApiOkResponse)(),
    (0, swagger_1.ApiNotFoundResponse)(),
    (0, swagger_1.ApiBadRequestResponse)(),
    (0, common_1.HttpCode)(common_1.HttpStatus.OK),
    __param(0, (0, common_1.Headers)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", void 0)
], UsersController.prototype, "getOne", null);
__decorate([
    (0, swagger_1.ApiHeader)({
        name: 'autharization',
        description: 'User token',
        required: true,
    }),
    (0, swagger_1.ApiBadRequestResponse)(),
    (0, common_1.HttpCode)(common_1.HttpStatus.OK),
    (0, common_1.Patch)('/update'),
    __param(0, (0, common_1.Headers)()),
    __param(1, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, update_user_dto_1.UpdateUserDto]),
    __metadata("design:returntype", void 0)
], UsersController.prototype, "update", null);
__decorate([
    (0, swagger_1.ApiHeader)({
        name: 'autharization',
        description: 'User token',
        required: true,
    }),
    (0, swagger_1.ApiNotFoundResponse)(),
    (0, swagger_1.ApiNoContentResponse)(),
    (0, common_1.HttpCode)(common_1.HttpStatus.NO_CONTENT),
    (0, common_1.Delete)('/delete'),
    __param(0, (0, common_1.Headers)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", void 0)
], UsersController.prototype, "deleteUser", null);
UsersController = __decorate([
    (0, swagger_1.ApiTags)('Users'),
    (0, common_1.Controller)('users'),
    __metadata("design:paramtypes", [users_service_1.UsersService])
], UsersController);
exports.UsersController = UsersController;
//# sourceMappingURL=users.controller.js.map