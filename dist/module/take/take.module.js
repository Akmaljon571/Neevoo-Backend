"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.TakeModule = void 0;
const common_1 = require("@nestjs/common");
const take_service_1 = require("./take.service");
const take_controller_1 = require("./take.controller");
const token_middleware_1 = require("../../middleWare/token.middleware");
let TakeModule = class TakeModule {
};
TakeModule = __decorate([
    (0, common_1.Module)({
        controllers: [take_controller_1.TakeController],
        providers: [take_service_1.TakeService, token_middleware_1.TokenMiddleware],
    })
], TakeModule);
exports.TakeModule = TakeModule;
//# sourceMappingURL=take.module.js.map