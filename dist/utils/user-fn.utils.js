"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.UserFn = void 0;
class UserFn {
    date(time) {
        const date = JSON.stringify(time)
            .split('T')[0]
            .split('"')[1]
            .split('-')
            .reverse()
            .join(' ');
        return date;
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
}
exports.UserFn = UserFn;
//# sourceMappingURL=user-fn.utils.js.map