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
exports.TakeEntity = void 0;
const typeorm_1 = require("typeorm");
const users_entity_1 = require("./users.entity");
let TakeEntity = class TakeEntity extends typeorm_1.BaseEntity {
};
__decorate([
    (0, typeorm_1.PrimaryGeneratedColumn)('uuid', { name: 'take_id' }),
    __metadata("design:type", String)
], TakeEntity.prototype, "id", void 0);
__decorate([
    (0, typeorm_1.Column)({
        type: 'integer',
        name: 'take_month',
        nullable: false,
    }),
    __metadata("design:type", Number)
], TakeEntity.prototype, "month", void 0);
__decorate([
    (0, typeorm_1.Column)({
        type: 'varchar',
        name: 'take_price',
        nullable: false,
    }),
    __metadata("design:type", String)
], TakeEntity.prototype, "price", void 0);
__decorate([
    (0, typeorm_1.Column)({
        type: 'boolean',
        nullable: false,
        name: 'take_active',
        default: true,
    }),
    __metadata("design:type", Boolean)
], TakeEntity.prototype, "active", void 0);
__decorate([
    (0, typeorm_1.ManyToOne)(() => users_entity_1.UsersEntity, (user) => user.take, {
        onDelete: 'CASCADE',
    }),
    (0, typeorm_1.JoinColumn)({ name: 'take_user' }),
    __metadata("design:type", users_entity_1.UsersEntity)
], TakeEntity.prototype, "take_user", void 0);
__decorate([
    (0, typeorm_1.CreateDateColumn)(),
    __metadata("design:type", Date)
], TakeEntity.prototype, "create_date", void 0);
__decorate([
    (0, typeorm_1.UpdateDateColumn)({
        select: false,
    }),
    __metadata("design:type", Date)
], TakeEntity.prototype, "update_date", void 0);
TakeEntity = __decorate([
    (0, typeorm_1.Entity)({ name: 'take' })
], TakeEntity);
exports.TakeEntity = TakeEntity;
//# sourceMappingURL=take.entity.js.map