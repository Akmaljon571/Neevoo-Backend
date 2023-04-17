import { CategoryEntity } from 'src/entities/category.entity';
import { CreateCategoryDto } from './dto/create-category.dto';
import { UpdateCategoryDto } from './dto/update-category.dto';
export declare class CategoriesService {
    foundCategory(categoryId: string): Promise<CategoryEntity>;
    create(payload: CreateCategoryDto, cat_link: string): Promise<void>;
    findAll(): Promise<CategoryEntity[]>;
    searchTitle(filterDto: string): Promise<any>;
    update(id: string, payload: UpdateCategoryDto, cat_link: any): Promise<void>;
    remove(id: string): Promise<void>;
}
