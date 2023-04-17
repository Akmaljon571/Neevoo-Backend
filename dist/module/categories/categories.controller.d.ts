/// <reference types="multer" />
import { TokenMiddleware } from 'src/middleWare/token.middleware';
import { CategoriesService } from './categories.service';
import { CreateCategoryDto } from './dto/create-category.dto';
import { UpdateCategoryDto } from './dto/update-category.dto';
export declare class CategoriesController {
    private readonly categoriesService;
    private readonly verifyToken;
    constructor(categoriesService: CategoriesService, verifyToken: TokenMiddleware);
    uploadfile(file: Express.Multer.File, createCategoryDto: CreateCategoryDto, headers: any): Promise<void>;
    findAll(): Promise<import("../../entities/category.entity").CategoryEntity[]>;
    findByTitle(filterDto: string): Promise<any>;
    uploadUpdateFile(id: string, file: Express.Multer.File, body: UpdateCategoryDto, headers: any): Promise<void>;
    remove(id: string, headers: any): Promise<void>;
}
