import { CreateVideoDto } from './dto/create-video.dto';
export declare class VideosService {
    create(createVideoDto: CreateVideoDto, bool: string): Promise<void>;
    findAll(courseId: string, userId: any): Promise<any[]>;
    findOne(videoId: string, userId: any): Promise<any>;
    update(id: string, updateVideoDto: any, link: any): Promise<void>;
    delete(id: string): Promise<void>;
}
