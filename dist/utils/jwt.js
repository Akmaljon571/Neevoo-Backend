"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const common_1 = require("@nestjs/common");
const dotenv = require("dotenv");
const jwt = require("jsonwebtoken");
dotenv.config();
class JwtStrategy {
    constructor() {
        this.JWT_SECRET = process.env.SECRET_KEY;
    }
    sign(payload) {
        return jwt.sign(payload, this.JWT_SECRET);
    }
    verify(token) {
        try {
            const decoded = jwt.verify(token, this.JWT_SECRET);
            return decoded;
        }
        catch (error) {
            throw new common_1.HttpException('Bad Request', common_1.HttpStatus.BAD_REQUEST);
        }
    }
}
exports.default = new JwtStrategy();
//# sourceMappingURL=jwt.js.map