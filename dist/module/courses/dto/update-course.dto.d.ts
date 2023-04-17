import { CreateCourseDto } from './create-course.dto';
declare const UpdateCourseDto_base: import("@nestjs/common").Type<Partial<CreateCourseDto>>;
export declare class UpdateCourseDto extends UpdateCourseDto_base {
    title: string;
    lang: string;
    description: string;
    category: string;
}
export {};
