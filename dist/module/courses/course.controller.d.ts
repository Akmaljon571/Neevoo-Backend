/// <reference types="multer" />
import { CreateCourseDto } from './dto/create-course.dto';
import { TokenMiddleware } from 'src/middleWare/token.middleware';
import { CourseService } from './course.service';
import { UpdateCourseDto } from './dto/update-course.dto';
export declare class CourseController {
    private readonly courseService;
    private readonly verifyToken;
    constructor(courseService: CourseService, verifyToken: TokenMiddleware);
    create(createCourseDto: CreateCourseDto, file: Express.Multer.File, headers: any): Promise<void>;
    findAll(): Promise<import("../../entities/courses.entity").CoursesEntity[]>;
    findOne(cat_id: string): Promise<any>;
    findByTitle(title: string): Promise<any>;
    update(id: string, updateCourseDto: UpdateCourseDto, file: Express.Multer.File, headers: any): Promise<void>;
    remove(id: string, headers: any): Promise<void>;
}
