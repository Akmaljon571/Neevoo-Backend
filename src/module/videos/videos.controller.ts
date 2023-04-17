import {
  Body,
  Controller,
  Delete,
  Get,
  Headers,
  HttpCode,
  HttpStatus,
  Param,
  Patch,
  Post,
  UploadedFile,
  UseInterceptors,
} from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import {
  ApiBadRequestResponse,
  ApiBody,
  ApiConsumes,
  ApiHeader,
  ApiNotFoundResponse,
  ApiOkResponse,
  ApiOperation,
  ApiTags,
} from '@nestjs/swagger';
import { TokenMiddleware } from 'src/middleWare/token.middleware';
import { googleCloud } from 'src/utils/google-cloud';
import { CreateVideoDto } from './dto/create-video.dto';
import { UpdateVideoDto } from './dto/update-video.dto';
import { VideosService } from './videos.service';

@Controller('video')
@ApiTags('Videos')
export class VideosController {
  constructor(
    private readonly videoService: VideosService,
    private readonly VerifyToken: TokenMiddleware,
  ) {}

  @Post('create')
  @HttpCode(HttpStatus.CREATED)
  @ApiBody({
    schema: {
      type: 'object',
      required: [
        'file',
        'video_text',
        'video_duration',
        'sequence',
        'video_course',
      ],
      properties: {
        file: {
          type: 'string',
          format: 'binary',
        },
        video_text: {
          type: 'string',
          default: '3-dars',
        },
        video_duration: {
          type: 'string',
          default: '30:00',
        },
        sequence: {
          type: 'number',
          default: 4,
        },
        video_course: {
          type: 'string',
          default: 'uuid',
        },
      },
    },
  })
  @ApiConsumes('multipart/form-data')
  @ApiOperation({ summary: 'Attendance Punch In' })
  @ApiBadRequestResponse()
  @ApiNotFoundResponse()
  @ApiHeader({
    name: 'autharization',
    description: 'Admin token',
    required: true,
  })
  @UseInterceptors(FileInterceptor('file'))
  async uploadVideo(
    @UploadedFile() file: Express.Multer.File,
    @Body() createVideoDto: CreateVideoDto,
    @Headers() header: any,
  ) {
    const adminId = await this.VerifyToken.verifyAdmin(header);
    if (adminId) {
      const bool: any = await googleCloud(file);
      if (bool) {
        return await this.videoService.create(createVideoDto, bool);
      }
    }
  }

  @Get('/by_course/:id')
  @ApiOkResponse()
  @ApiNotFoundResponse()
  @ApiBadRequestResponse()
  @ApiHeader({
    name: 'autharization',
    description: 'User token',
    required: false,
  })
  @HttpCode(HttpStatus.OK)
  async findAll(@Param('id') course: string, @Headers() headers: any) {
    if (headers?.autharization) {
      const userId: string = await this.VerifyToken.verifyUser(headers);
      if (userId) {
        return await this.videoService.findAll(course, userId);
      }
    } else {
      return await this.videoService.findAll(course, false);
    }
  }

  @Get(':id')
  @ApiOkResponse()
  @ApiNotFoundResponse()
  @ApiBadRequestResponse()
  @ApiHeader({
    name: 'autharization',
    description: 'User token',
    required: false,
  })
  @HttpCode(HttpStatus.OK)
  async findOne(@Param('id') videoId: string, @Headers() headers: any) {
    if (headers?.autharization) {
      const userId = await this.VerifyToken.verifyUser(headers);
      if (userId) {
        return await this.videoService.findOne(videoId, userId);
      }
    } else {
      return await this.videoService.findOne(videoId, false);
    }
  }

  @Patch('/update/:id')
  @HttpCode(HttpStatus.NO_CONTENT)
  @ApiBody({
    schema: {
      type: 'object',
      properties: {
        file: {
          type: 'string',
          format: 'binary',
        },
        video_text: {
          type: 'string',
          default: '3-dars',
        },
        video_duration: {
          type: 'string',
          default: '30:00',
        },
        sequence: {
          type: 'number',
          default: 4,
        },
        video_course: {
          type: 'string',
          default: 'uuid',
        },
      },
    },
  })
  @ApiConsumes('multipart/form-data')
  @ApiOperation({ summary: 'Attendance Punch In' })
  @ApiBadRequestResponse()
  @ApiNotFoundResponse()
  @ApiHeader({
    name: 'autharization',
    description: 'Admin token',
    required: false,
  })
  @UseInterceptors(FileInterceptor('file'))
  async update(
    @Param('id') id: string,
    @Headers() header: any,
    @Body() updateVideoDto: UpdateVideoDto,
    @UploadedFile() file: Express.Multer.File,
  ) {
    await this.VerifyToken.verifyAdmin(header);
    if (file) {
      const link = await googleCloud(file);
      if (link) {
        await this.videoService.update(id, updateVideoDto, link);
      }
    } else {
      await this.videoService.update(id, updateVideoDto, false);
    }
  }

  @Delete('/delete/:id')
  @HttpCode(HttpStatus.NO_CONTENT)
  @ApiBadRequestResponse()
  @ApiNotFoundResponse()
  @ApiHeader({
    name: 'autharization',
    description: 'Admin token',
    required: true,
  })
  async delete(@Param('id') id: string, @Headers() header: any) {
    const adminId = await this.VerifyToken.verifyAdmin(header);
    if (adminId) {
      await this.videoService.delete(id);
    }
  }
}
