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
exports.CoursesEntity = void 0;
const typeorm_1 = require("typeorm");
const category_entity_1 = require("./category.entity");
const history_entity_1 = require("./history.entity");
const videos_entity_1 = require("./videos.entity");
let CoursesEntity = class CoursesEntity extends typeorm_1.BaseEntity {
};
__decorate([
    (0, typeorm_1.PrimaryGeneratedColumn)('uuid', { name: 'course_id' }),
    __metadata("design:type", String)
], CoursesEntity.prototype, "id", void 0);
__decorate([
    (0, typeorm_1.Column)({
        type: 'varchar',
        name: 'course_title',
        length: 65,
        nullable: false,
    }),
    __metadata("design:type", String)
], CoursesEntity.prototype, "title", void 0);
__decorate([
    (0, typeorm_1.Column)({
        type: 'varchar',
        name: 'course_image',
        nullable: false,
    }),
    __metadata("design:type", String)
], CoursesEntity.prototype, "image", void 0);
__decorate([
    (0, typeorm_1.Column)({
        type: 'varchar',
        name: 'course_lang',
        nullable: false,
    }),
    __metadata("design:type", String)
], CoursesEntity.prototype, "lang", void 0);
__decorate([
    (0, typeorm_1.Column)({
        type: 'varchar',
        name: 'course_description',
        nullable: false,
    }),
    __metadata("design:type", String)
], CoursesEntity.prototype, "description", void 0);
__decorate([
    (0, typeorm_1.ManyToOne)(() => category_entity_1.CategoryEntity, (category) => category.course, {
        onDelete: 'CASCADE',
    }),
    (0, typeorm_1.JoinColumn)({ name: 'course_cat' }),
    __metadata("design:type", category_entity_1.CategoryEntity)
], CoursesEntity.prototype, "course_cat", void 0);
__decorate([
    (0, typeorm_1.OneToMany)(() => history_entity_1.HistoryEntity, (history) => history.history_course),
    __metadata("design:type", Array)
], CoursesEntity.prototype, "course_history", void 0);
__decorate([
    (0, typeorm_1.OneToMany)(() => videos_entity_1.VideosEntity, (video) => video.course),
    __metadata("design:type", Array)
], CoursesEntity.prototype, "video", void 0);
__decorate([
    (0, typeorm_1.CreateDateColumn)(),
    __metadata("design:type", Date)
], CoursesEntity.prototype, "create_date", void 0);
__decorate([
    (0, typeorm_1.UpdateDateColumn)({
        select: false,
    }),
    __metadata("design:type", Date)
], CoursesEntity.prototype, "update_date", void 0);
CoursesEntity = __decorate([
    (0, typeorm_1.Entity)({ name: 'courses' })
], CoursesEntity);
exports.CoursesEntity = CoursesEntity;
//# sourceMappingURL=courses.entity.js.map