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
exports.HistoryEntity = void 0;
const typeorm_1 = require("typeorm");
const courses_entity_1 = require("./courses.entity");
const users_entity_1 = require("./users.entity");
let HistoryEntity = class HistoryEntity extends typeorm_1.BaseEntity {
};
__decorate([
    (0, typeorm_1.PrimaryGeneratedColumn)('uuid', { name: 'history_id' }),
    __metadata("design:type", String)
], HistoryEntity.prototype, "id", void 0);
__decorate([
    (0, typeorm_1.ManyToOne)(() => courses_entity_1.CoursesEntity, (course) => course.course_history, {
        onDelete: 'CASCADE',
    }),
    (0, typeorm_1.JoinColumn)({ name: 'history_course' }),
    __metadata("design:type", courses_entity_1.CoursesEntity)
], HistoryEntity.prototype, "history_course", void 0);
__decorate([
    (0, typeorm_1.ManyToOne)(() => users_entity_1.UsersEntity, (user) => user.user_history, {
        onDelete: 'CASCADE',
    }),
    (0, typeorm_1.JoinColumn)({ name: 'history_user' }),
    __metadata("design:type", users_entity_1.UsersEntity)
], HistoryEntity.prototype, "history_user", void 0);
__decorate([
    (0, typeorm_1.CreateDateColumn)({
        select: false,
    }),
    __metadata("design:type", Date)
], HistoryEntity.prototype, "create_date", void 0);
__decorate([
    (0, typeorm_1.UpdateDateColumn)({
        select: false,
    }),
    __metadata("design:type", Date)
], HistoryEntity.prototype, "update_date", void 0);
HistoryEntity = __decorate([
    (0, typeorm_1.Entity)({ name: 'history' })
], HistoryEntity);
exports.HistoryEntity = HistoryEntity;
//# sourceMappingURL=history.entity.js.map