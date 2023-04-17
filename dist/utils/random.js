"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.random = void 0;
const random = () => {
    const randomNumber = Math.floor(Math.random() * (100000 - 1 + 50) + 1);
    for (let i = 1; i < 5; i++) {
        if (randomNumber.toString().length == 5) {
            return String(randomNumber);
        }
        else {
            return String(randomNumber) + '1';
        }
    }
    return String(randomNumber);
};
exports.random = random;
//# sourceMappingURL=random.js.map