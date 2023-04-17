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
exports.HistoryControlller = void 0;
const common_1 = require("@nestjs/common");
const swagger_1 = require("@nestjs/swagger");
const token_middleware_1 = require("../../middleWare/token.middleware");
const history_service_1 = require("./history.service");
let HistoryControlller = class HistoryControlller {
    constructor(historyService, veridfyToken) {
        this.historyService = historyService;
        this.veridfyToken = veridfyToken;
    }
    async get(headers) {
        const userId = await this.veridfyToken.verifyUser(headers);
        if (userId) {
            return await this.historyService.get(userId);
        }
    }
    async hisobot() {
        return await this.historyService.hisobot();
    }
};
__decorate([
    (0, common_1.Get)(),
    (0, swagger_1.ApiOkResponse)(),
    (0, swagger_1.ApiNotFoundResponse)(),
    (0, swagger_1.ApiBadRequestResponse)(),
    (0, swagger_1.ApiHeader)({
        name: 'autharization',
        description: 'User token',
        required: true,
    }),
    (0, common_1.HttpCode)(common_1.HttpStatus.OK),
    __param(0, (0, common_1.Headers)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], HistoryControlller.prototype, "get", null);
__decorate([
    (0, common_1.Get)('/count'),
    (0, swagger_1.ApiOkResponse)(),
    (0, swagger_1.ApiNotFoundResponse)(),
    (0, swagger_1.ApiBadRequestResponse)(),
    (0, common_1.HttpCode)(common_1.HttpStatus.OK),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", Promise)
], HistoryControlller.prototype, "hisobot", null);
HistoryControlller = __decorate([
    (0, common_1.Controller)('/history'),
    (0, swagger_1.ApiTags)('History'),
    __metadata("design:paramtypes", [history_service_1.HistoryService,
        token_middleware_1.TokenMiddleware])
], HistoryControlller);
exports.HistoryControlller = HistoryControlller;
//# sourceMappingURL=history.controller.js.map