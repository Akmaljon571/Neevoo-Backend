"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.TakeService = void 0;
const take_entity_1 = require("./../../entities/take.entity");
const common_1 = require("@nestjs/common");
const users_entity_1 = require("../../entities/users.entity");
let TakeService = class TakeService {
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
    async create(body) {
        const findUser = await this.validateUser(body.user);
        await take_entity_1.TakeEntity.createQueryBuilder()
            .insert()
            .into(take_entity_1.TakeEntity)
            .values({
            month: body.month,
            price: body.price,
            take_user: findUser,
        })
            .execute();
    }
    async findAll() {
        return await take_entity_1.TakeEntity.find({
            relations: {
                take_user: true,
            },
        }).catch(() => {
            throw new common_1.HttpException('User Not Found', common_1.HttpStatus.NOT_FOUND);
        });
    }
    async remove(id) {
        const findTake = await take_entity_1.TakeEntity.findOne({
            where: {
                id,
            },
        }).catch(() => {
            throw new common_1.HttpException('User Not Found', common_1.HttpStatus.NOT_FOUND);
        });
        if (!findTake) {
            throw new common_1.HttpException('User Not Found', common_1.HttpStatus.NOT_FOUND);
        }
        await take_entity_1.TakeEntity.createQueryBuilder()
            .delete()
            .from(take_entity_1.TakeEntity)
            .where({
            id: findTake.id,
        })
            .execute();
    }
};
TakeService = __decorate([
    (0, common_1.Injectable)()
], TakeService);
exports.TakeService = TakeService;
//# sourceMappingURL=take.service.js.map