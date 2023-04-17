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
exports.VideosEntity = void 0;
const typeorm_1 = require("typeorm");
const category_entity_1 = require("./category.entity");
const courses_entity_1 = require("./courses.entity");
let VideosEntity = class VideosEntity extends typeorm_1.BaseEntity {
};
__decorate([
    (0, typeorm_1.PrimaryGeneratedColumn)('uuid', { name: 'video_id' }),
    __metadata("design:type", String)
], VideosEntity.prototype, "id", void 0);
__decorate([
    (0, typeorm_1.Column)({
        type: 'varchar',
        name: 'video_text',
        length: 100,
        nullable: false,
    }),
    __metadata("design:type", String)
], VideosEntity.prototype, "text", void 0);
__decorate([
    (0, typeorm_1.Column)({
        type: 'integer',
        name: 'video_sequence',
        nullable: false,
    }),
    __metadata("design:type", Number)
], VideosEntity.prototype, "sequence", void 0);
__decorate([
    (0, typeorm_1.Column)({
        type: 'varchar',
        name: 'video_link',
        nullable: false,
    }),
    __metadata("design:type", String)
], VideosEntity.prototype, "link", void 0);
__decorate([
    (0, typeorm_1.Column)({
        type: 'varchar',
        name: 'video_duration',
        nullable: false,
    }),
    __metadata("design:type", String)
], VideosEntity.prototype, "duration", void 0);
__decorate([
    (0, typeorm_1.ManyToOne)(() => courses_entity_1.CoursesEntity, (course) => course.video, {
        onDelete: 'CASCADE',
    }),
    (0, typeorm_1.JoinColumn)({ name: 'video_course' }),
    __metadata("design:type", category_entity_1.CategoryEntity)
], VideosEntity.prototype, "course", void 0);
__decorate([
    (0, typeorm_1.CreateDateColumn)({
        select: false,
    }),
    __metadata("design:type", Date)
], VideosEntity.prototype, "create_date", void 0);
__decorate([
    (0, typeorm_1.UpdateDateColumn)({
        select: false,
    }),
    __metadata("design:type", Date)
], VideosEntity.prototype, "update_date", void 0);
VideosEntity = __decorate([
    (0, typeorm_1.Entity)({ name: 'videos' })
], VideosEntity);
exports.VideosEntity = VideosEntity;
//# sourceMappingURL=videos.entity.js.map