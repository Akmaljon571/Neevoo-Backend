"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.CategoriesService = void 0;
const common_1 = require("@nestjs/common");
const category_entity_1 = require("../../entities/category.entity");
let CategoriesService = class CategoriesService {
    async foundCategory(categoryId) {
        const category = await category_entity_1.CategoryEntity.findOne({
            where: {
                id: categoryId,
            },
        });
        if (!category) {
            throw new common_1.NotFoundException();
        }
        return category;
    }
    async create(payload, cat_link) {
        await category_entity_1.CategoryEntity.createQueryBuilder()
            .insert()
            .into(category_entity_1.CategoryEntity)
            .values({
            title: payload.title,
            description: payload.description,
            image: cat_link,
        })
            .execute()
            .catch(() => {
            throw new common_1.HttpException('Bad Request in catch', common_1.HttpStatus.NOT_FOUND);
        });
    }
    async findAll() {
        return await category_entity_1.CategoryEntity.find().catch(() => {
            throw new common_1.HttpException('Categories Not Found', common_1.HttpStatus.NOT_FOUND);
        });
    }
    async searchTitle(filterDto) {
        const title = filterDto.toLowerCase().trim();
        let tasks = await this.findAll();
        if (title) {
            tasks = tasks.filter((task) => task.title.toLowerCase().includes(title));
        }
        return tasks;
    }
    async update(id, payload, cat_link) {
        const category = await this.foundCategory(id);
        await category_entity_1.CategoryEntity.createQueryBuilder()
            .update()
            .set({
            description: payload.description || category.description,
            title: payload.title || category.title,
            image: cat_link || category.image,
        })
            .where({
            id: id,
        })
            .execute()
            .catch(() => {
            throw new common_1.HttpException('Bad Request in catch', common_1.HttpStatus.NOT_FOUND);
        });
    }
    async remove(id) {
        const category = await this.foundCategory(id);
        if (category) {
            await category_entity_1.CategoryEntity.delete(id);
        }
    }
};
CategoriesService = __decorate([
    (0, common_1.Injectable)()
], CategoriesService);
exports.CategoriesService = CategoriesService;
//# sourceMappingURL=categories.service.js.map