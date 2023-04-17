"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const common_1 = require("@nestjs/common");
const nodemailer = require("nodemailer");
const senMail = async (adres, content) => {
    try {
        const transport = nodemailer.createTransport({
            service: 'gmail',
            port: 587,
            secure: true,
            auth: {
                user: 'lincorteamnt@gmail.com',
                pass: 'xbewqqnfarwklaaj',
            },
            tls: {
                rejectUnauthorized: false,
            },
        });
        await transport.sendMail({
            from: 'lincorteamnt@gmail.com',
            to: adres,
            subject: content,
            text: content,
        });
    }
    catch (error) {
        throw new common_1.HttpException('Bad Request', common_1.HttpStatus.BAD_REQUEST);
    }
};
exports.default = senMail;
//# sourceMappingURL=node_mail.js.map