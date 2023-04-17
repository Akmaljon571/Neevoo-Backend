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
exports.UsersEntity = void 0;
const typeorm_1 = require("typeorm");
const history_entity_1 = require("./history.entity");
const take_entity_1 = require("./take.entity");
let UsersEntity = class UsersEntity extends typeorm_1.BaseEntity {
};
__decorate([
    (0, typeorm_1.PrimaryGeneratedColumn)('uuid', { name: 'user_id' }),
    __metadata("design:type", String)
], UsersEntity.prototype, "id", void 0);
__decorate([
    (0, typeorm_1.Column)({
        type: 'varchar',
        name: 'user_email',
        nullable: false,
    }),
    __metadata("design:type", String)
], UsersEntity.prototype, "email", void 0);
__decorate([
    (0, typeorm_1.Column)({
        type: 'varchar',
        name: 'user_password',
        nullable: false,
    }),
    __metadata("design:type", String)
], UsersEntity.prototype, "password", void 0);
__decorate([
    (0, typeorm_1.OneToMany)(() => take_entity_1.TakeEntity, (take) => take.take_user),
    __metadata("design:type", Array)
], UsersEntity.prototype, "take", void 0);
__decorate([
    (0, typeorm_1.OneToMany)(() => history_entity_1.HistoryEntity, (history) => history.history_user),
    __metadata("design:type", Array)
], UsersEntity.prototype, "user_history", void 0);
__decorate([
    (0, typeorm_1.CreateDateColumn)({
        select: false,
    }),
    __metadata("design:type", Date)
], UsersEntity.prototype, "create_date", void 0);
__decorate([
    (0, typeorm_1.UpdateDateColumn)({
        select: false,
    }),
    __metadata("design:type", Date)
], UsersEntity.prototype, "update_date", void 0);
UsersEntity = __decorate([
    (0, typeorm_1.Entity)({ name: 'users' })
], UsersEntity);
exports.UsersEntity = UsersEntity;
//# sourceMappingURL=users.entity.js.map