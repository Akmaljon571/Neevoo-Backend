import { CoursesEntity } from './../../entities/courses.entity';
import { CreateCourseDto } from './dto/create-course.dto';
import { UpdateCourseDto } from './dto/update-course.dto';
export declare class CourseService {
    date(time: Date): string;
    byCategory(cat_id: any): Promise<any>;
    searchTitle(name: string): Promise<any>;
    findAll(): Promise<CoursesEntity[]>;
    create(createCourseDto: CreateCourseDto, imgLink: any): Promise<void>;
    update(id: string, updateCourseDto: UpdateCourseDto, imgLink: any): Promise<void>;
    remove(id: string): Promise<void>;
}
