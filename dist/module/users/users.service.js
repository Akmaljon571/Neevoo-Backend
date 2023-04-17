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
Object.defineProperty(exports, "__esModule", { value: true });
exports.UsersService = void 0;
const common_1 = require("@nestjs/common");
const users_entity_1 = require("../../entities/users.entity");
const token_middleware_1 = require("../../middleWare/token.middleware");
const jwt_1 = require("../../utils/jwt");
const nestjs_redis_1 = require("@liaoliaots/nestjs-redis");
const node_mail_1 = require("../../utils/node_mail");
const random_1 = require("../../utils/random");
let UsersService = class UsersService {
    constructor(redisService, tokenmiddleware) {
        this.redisService = redisService;
        this.tokenmiddleware = tokenmiddleware;
        this.redis = this.redisService.getClient();
    }
    async verifyUser(headers) {
        const getUserId = await this.tokenmiddleware
            .verifyUser(headers)
            .catch(() => {
            throw new common_1.HttpException('bad request in token', common_1.HttpStatus.BAD_REQUEST);
        });
        return getUserId;
    }
    async registr(body) {
        const randomSon = (0, random_1.random)();
        const allReady = await users_entity_1.UsersEntity.findOne({
            where: {
                email: body.email,
                password: body.password,
            },
        }).catch(() => undefined);
        if (allReady) {
            throw new common_1.HttpException('User Already exists', common_1.HttpStatus.BAD_REQUEST);
        }
        await (0, node_mail_1.default)(body.email, randomSon);
        const newObj = {
            email: body.email,
            password: body.password,
            random: randomSon,
        };
        await this.redis.set(randomSon, JSON.stringify(newObj));
        return {
            message: 'Code send Email',
            status: 200,
        };
    }
    async registr_email(random) {
        const result = await this.redis.get(random);
        const redis = JSON.parse(result);
        if (!redis || redis.random != random) {
            throw new common_1.HttpException('Not Found', common_1.HttpStatus.NOT_FOUND);
        }
        const findUser = await users_entity_1.UsersEntity.findOne({
            where: {
                email: redis.email,
            },
        }).catch(() => []);
        if (findUser) {
            throw new common_1.HttpException('User already exists', common_1.HttpStatus.BAD_REQUEST);
        }
        const { raw: [raw], } = await users_entity_1.UsersEntity.createQueryBuilder()
            .insert()
            .into(users_entity_1.UsersEntity)
            .values({
            email: redis.email,
            password: redis.password,
        })
            .returning('*')
            .execute();
        const token = jwt_1.default.sign({ id: raw.user_id, email: raw.user_email });
        this.redis.del(random);
        return {
            token,
            status: 201,
        };
    }
    async login(body) {
        const allReady = await users_entity_1.UsersEntity.findOne({
            where: {
                email: body.email,
                password: body.password,
            },
        }).catch(() => undefined);
        if (!allReady) {
            throw new common_1.HttpException('User Not Fount', common_1.HttpStatus.NOT_FOUND);
        }
        const token = jwt_1.default.sign({ id: allReady.id, email: allReady.email });
        return {
            token,
            status: 201,
        };
    }
    async parol(body) {
        const randomSon = (0, random_1.random)();
        const findUser = await users_entity_1.UsersEntity.findOne({
            where: {
                email: body.email,
            },
        }).catch(() => []);
        if (!findUser) {
            throw new common_1.HttpException('Not Found', common_1.HttpStatus.NOT_FOUND);
        }
        await (0, node_mail_1.default)(body.email, randomSon);
        const newObj = {
            email: body.email,
            random: randomSon,
        };
        await this.redis.set(randomSon, JSON.stringify(newObj));
        return {
            message: 'Code send Email',
            status: 200,
        };
    }
    async parol_email(random, body) {
        const result = await this.redis.get(random);
        const redis = JSON.parse(result);
        if (!redis || redis.random != random) {
            throw new common_1.HttpException('Not Found', common_1.HttpStatus.NOT_FOUND);
        }
        const findUser = await users_entity_1.UsersEntity.findOne({
            where: {
                email: redis.email,
            },
        }).catch(() => []);
        if (!findUser) {
            throw new common_1.HttpException('Not Found', common_1.HttpStatus.NOT_FOUND);
        }
        this.redis.del(random);
        if (body.newPassword != body.password) {
            throw new common_1.HttpException('Bad Request', common_1.HttpStatus.BAD_REQUEST);
        }
        await users_entity_1.UsersEntity.createQueryBuilder()
            .update()
            .set({
            password: body.password,
        })
            .where({ id: findUser.id })
            .execute();
        return {
            message: 'User password successfully updated',
            status: 200,
        };
    }
    async getAdmin(headers) {
        const verifyAdmin = await this.tokenmiddleware
            .verifyAdmin(headers)
            .catch(() => {
            throw new common_1.HttpException('bad request in Admin token', common_1.HttpStatus.BAD_REQUEST);
        });
        if (verifyAdmin) {
            const getAllUsers = (await users_entity_1.UsersEntity.find()).filter((e) => delete e.password);
            return getAllUsers;
        }
    }
    async getOne(headers) {
        const verifyUser = await this.tokenmiddleware
            .verifyUser(headers)
            .catch(() => {
            throw new common_1.HttpException('bad request in Admin token', common_1.HttpStatus.BAD_REQUEST);
        });
        if (verifyUser) {
            const getAllUsers = await users_entity_1.UsersEntity.findOne({
                where: {
                    id: verifyUser,
                },
            }).catch(() => {
                throw new common_1.HttpException('Bad Request', common_1.HttpStatus.BAD_REQUEST);
            });
            return getAllUsers;
        }
    }
    async update(headers, payload) {
        const getUserId = await this.verifyUser(headers);
        if (getUserId) {
            await users_entity_1.UsersEntity.createQueryBuilder()
                .update({ password: payload.password })
                .where({
                id: getUserId,
            })
                .execute()
                .catch(() => {
                throw new common_1.HttpException('bad request', common_1.HttpStatus.BAD_REQUEST);
            });
        }
    }
    async deleteUser(headers) {
        const getUserId = await this.tokenmiddleware
            .verifyUser(headers)
            .catch(() => {
            throw new common_1.HttpException('bad request in token', common_1.HttpStatus.BAD_REQUEST);
        });
        await users_entity_1.UsersEntity.createQueryBuilder()
            .delete()
            .where({ id: getUserId })
            .execute()
            .catch(() => {
            throw new common_1.HttpException('bad request', common_1.HttpStatus.BAD_REQUEST);
        });
    }
};
UsersService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [nestjs_redis_1.RedisService,
        token_middleware_1.TokenMiddleware])
], UsersService);
exports.UsersService = UsersService;
//# sourceMappingURL=users.service.js.map