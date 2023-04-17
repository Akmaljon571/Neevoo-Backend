"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.appConfig = void 0;
const config_1 = require("@nestjs/config");
class AppConfig {
}
console.log();
exports.appConfig = (0, config_1.registerAs)('app', () => ({
    port: process.env.PORT ? Number(process.env.PORT) : undefined,
}));
//# sourceMappingURL=index.js.map