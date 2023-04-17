"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.TokenMiddleware = void 0;
const common_1 = require("@nestjs/common");
const users_entity_1 = require("../entities/users.entity");
const jwt_1 = require("../utils/jwt");
class TokenMiddleware {
    async verifyAdmin(headers) {
        if (!headers.autharization) {
            throw new common_1.HttpException('Bad Request in Token', common_1.HttpStatus.BAD_REQUEST);
        }
        const id_email = jwt_1.default.verify(headers.autharization);
        if (!id_email) {
            throw new common_1.HttpException('Invalid Token', common_1.HttpStatus.BAD_REQUEST);
        }
        const admin = await users_entity_1.UsersEntity.findOneBy({
            id: id_email === null || id_email === void 0 ? void 0 : id_email.id,
            email: id_email === null || id_email === void 0 ? void 0 : id_email.email,
        });
        if (!(admin === null || admin === void 0 ? void 0 : admin.email)) {
            throw new common_1.HttpException('Invalid Token', common_1.HttpStatus.BAD_REQUEST);
        }
        return admin.id;
    }
    async verifyUser(headers) {
        if (!headers.autharization) {
            throw new common_1.HttpException('Bad Request in Token', common_1.HttpStatus.BAD_REQUEST);
        }
        const id_email = jwt_1.default.verify(headers.autharization);
        if (!id_email) {
            throw new common_1.HttpException('Bad Request in Token', common_1.HttpStatus.BAD_REQUEST);
        }
        const user = await users_entity_1.UsersEntity.findOneBy({
            id: id_email === null || id_email === void 0 ? void 0 : id_email.id,
            email: id_email === null || id_email === void 0 ? void 0 : id_email.email,
        });
        if (!(user === null || user === void 0 ? void 0 : user.email)) {
            throw new common_1.HttpException('Invalid Token', common_1.HttpStatus.BAD_REQUEST);
        }
        return user.id;
    }
}
exports.TokenMiddleware = TokenMiddleware;
//# sourceMappingURL=token.middleware.js.map