"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.TakeMiddleware = void 0;
const common_1 = require("@nestjs/common");
const take_entity_1 = require("../entities/take.entity");
let TakeMiddleware = class TakeMiddleware {
    date(time) {
        const date = JSON.stringify(time)
            .split('T')[0]
            .split('"')[1]
            .split('-')
            .reverse()
            .join(' ');
        return date;
    }
    trim(st) {
        return Number(st.split(' ').join('').split(' ').join('').split(' ').join(''));
    }
    plus(date, month) {
        const result = date.map((e) => Number(e));
        const natija = result[1] + month;
        if (natija > 12) {
            const qoldiq = natija - 12;
            result[2] += 1;
            return [result[0], qoldiq, result[2]];
        }
        return [result[0], natija, result[2]];
    }
    async taqoslash(result, today, id) {
        if (result[0] == today[0] &&
            result[1] < today[1] &&
            result[2] == today[2]) {
            await take_entity_1.TakeEntity.createQueryBuilder()
                .update()
                .set({
                active: false,
            })
                .where({
                id,
            })
                .execute();
        }
        else if (result[0] < today[0] &&
            result[1] == today[1] &&
            result[2] == today[2]) {
            await take_entity_1.TakeEntity.createQueryBuilder()
                .update()
                .set({
                active: false,
            })
                .where({
                id,
            })
                .execute();
        }
    }
    async use(req, res, next) {
        const allTake = await take_entity_1.TakeEntity.find();
        const date = new Date();
        const today = this.date(date)
            .split(' ')
            .map((e) => Number(e));
        for (let i = 0; i < allTake.length; i++) {
            if (allTake[i].active) {
                const bazaCreate = this.date(allTake[i].create_date).split(' ');
                const result = this.plus(bazaCreate, allTake[i].month);
                this.taqoslash(result, today, allTake[i].id);
            }
        }
        next();
    }
};
TakeMiddleware = __decorate([
    (0, common_1.Injectable)()
], TakeMiddleware);
exports.TakeMiddleware = TakeMiddleware;
//# sourceMappingURL=take.middleware.js.map