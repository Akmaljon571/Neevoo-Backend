import { CreateVideoDto } from './create-video.dto';
declare const UpdateVideoDto_base: import("@nestjs/common").Type<Partial<CreateVideoDto>>;
export declare class UpdateVideoDto extends UpdateVideoDto_base {
    video_text: string;
    video_duration: string;
    sequence: number;
    video_course: string;
}
export {};
