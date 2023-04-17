"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.googleCloud = void 0;
const uuid_1 = require("uuid");
const storage_1 = require("@google-cloud/storage");
const path_1 = require("path");
const projectId = 'peerless-watch-382417';
const keyFilename = (0, path_1.resolve)(process.cwd(), 'src', 'utils', 'key.json');
const storage = new storage_1.Storage({
    projectId,
    keyFilename,
});
const bucket = storage.bucket('course_hunter');
const googleCloud = (file) => {
    var _a, _b;
    if (!file.length) {
        const a = [];
        a.push(file);
        const imageLink = (0, path_1.join)((0, uuid_1.v4)() + (0, path_1.extname)((_a = a[0]) === null || _a === void 0 ? void 0 : _a.originalname));
        const blob = bucket.file(imageLink);
        const blobStream = blob.createWriteStream();
        blobStream.end((_b = a[0]) === null || _b === void 0 ? void 0 : _b.buffer);
        return imageLink;
    }
    else if (file.length) {
        const result = [];
        for (let i = 0; i < file.length; i++) {
            const imageLink = (0, path_1.join)((0, uuid_1.v4)() + (0, path_1.extname)(file[i].originalname));
            const blob = bucket.file(imageLink);
            const blobStream = blob.createWriteStream();
            result.push(imageLink);
            blobStream.end(file[i].buffer);
        }
        return result;
    }
};
exports.googleCloud = googleCloud;
//# sourceMappingURL=google-cloud.js.map