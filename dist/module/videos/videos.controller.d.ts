/// <reference types="multer" />
import { TokenMiddleware } from 'src/middleWare/token.middleware';
import { CreateVideoDto } from './dto/create-video.dto';
import { UpdateVideoDto } from './dto/update-video.dto';
import { VideosService } from './videos.service';
export declare class VideosController {
    private readonly videoService;
    private readonly VerifyToken;
    constructor(videoService: VideosService, VerifyToken: TokenMiddleware);
    uploadVideo(file: Express.Multer.File, createVideoDto: CreateVideoDto, header: any): Promise<void>;
    findAll(course: string, headers: any): Promise<any[]>;
    findOne(videoId: string, headers: any): Promise<any>;
    update(id: string, header: any, updateVideoDto: UpdateVideoDto, file: Express.Multer.File): Promise<void>;
    delete(id: string, header: any): Promise<void>;
}
