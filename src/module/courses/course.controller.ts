import { FileInterceptor } from '@nestjs/platform-express';
import { CreateCourseDto } from './dto/create-course.dto';
import { googleCloud } from './../../utils/google-cloud';
import { TokenMiddleware } from 'src/middleWare/token.middleware';
import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  HttpCode,
  HttpStatus,
} from '@nestjs/common';
import { CourseService } from './course.service';
import { UpdateCourseDto } from './dto/update-course.dto';
import {
  ApiBadRequestResponse,
  ApiBody,
  ApiConsumes,
  ApiCreatedResponse,
  ApiForbiddenResponse,
  ApiHeader,
  ApiNoContentResponse,
  ApiNotFoundResponse,
  ApiOkResponse,
  ApiTags,
  ApiUnprocessableEntityResponse,
} from '@nestjs/swagger';
import {
  Headers,
  UploadedFile,
  UseInterceptors,
} from '@nestjs/common/decorators';

@Controller('courses')
@ApiTags('Course')
export class CourseController {
  constructor(
    private readonly courseService: CourseService,
    private readonly verifyToken: TokenMiddleware,
  ) {}

  @Post('/create')
  @HttpCode(HttpStatus.CREATED)
  @ApiBadRequestResponse()
  @ApiNotFoundResponse()
  @ApiCreatedResponse()
  @ApiBody({
    schema: {
      type: 'object',
      required: ['title', 'file', 'lang', 'description', 'category'],
      properties: {
        file: {
          type: 'string',
          format: 'binary',
        },
        title: {
          type: 'string',
          default: 'Express.js',
        },
        lang: {
          type: 'string',
          default: 'uz',
        },
        description: {
          type: 'string',
          default: 'Express good',
        },
        category: {
          type: 'number',
          default: 'af33daf0-c68d-4c74-a0d0-d2f0b1c1a7aa',
        },
      },
    },
  })
  @ApiHeader({
    name: 'autharization',
    description: 'Admin token',
    required: true,
  })
  @ApiConsumes('multipart/form-data')
  @UseInterceptors(FileInterceptor('file'))
  async create(
    @Body() createCourseDto: CreateCourseDto,
    @UploadedFile() file: Express.Multer.File,
    @Headers() headers: any,
  ) {
    await this.verifyToken.verifyAdmin(headers);
    if (file) {
      const imgLink = googleCloud(file);
      return this.courseService.create(createCourseDto, imgLink);
    }
    return this.courseService.create(createCourseDto, undefined);
  }

  @Get()
  @HttpCode(HttpStatus.OK)
  @ApiBadRequestResponse()
  @ApiNotFoundResponse()
  @ApiOkResponse()
  findAll() {
    return this.courseService.findAll();
  }

  @Get('/bycategory/:id')
  @HttpCode(HttpStatus.OK)
  @ApiBadRequestResponse()
  @ApiNotFoundResponse()
  @ApiOkResponse()
  findOne(@Param('id') cat_id: string) {
    return this.courseService.byCategory(cat_id);
  }

  @Get('/:search')
  @ApiBadRequestResponse()
  @ApiNotFoundResponse()
  @ApiOkResponse()
  findByTitle(@Param('search') title: string) {
    if (Object.keys(title).length) {
      return this.courseService.searchTitle(title);
    } else {
      return this.courseService.findAll();
    }
  }

  @Patch('/update/:id')
  @ApiBody({
    schema: {
      type: 'object',
      properties: {
        title: {
          type: 'string',
        },
        file: {
          type: 'string',
          format: 'binary',
        },
        lang: {
          type: 'string',
        },
        description: {
          type: 'string',
        },
        category: {
          type: 'string',
        },
      },
    },
  })
  @HttpCode(HttpStatus.NO_CONTENT)
  @ApiConsumes('multipart/form-data')
  @ApiBadRequestResponse()
  @ApiNotFoundResponse()
  @ApiNoContentResponse()
  @UseInterceptors(FileInterceptor('file'))
  @ApiHeader({
    name: 'autharization',
    description: 'Admin token',
    required: true,
  })
  async update(
    @Param('id') id: string,
    @Body() updateCourseDto: UpdateCourseDto,
    @UploadedFile() file: Express.Multer.File,
    @Headers() headers: any,
  ) {
    await this.verifyToken.verifyAdmin(headers);
    if (file) {
      const imgLink: any = await googleCloud(file);
      return await this.courseService.update(id, updateCourseDto, imgLink);
    }
    return await this.courseService.update(id, updateCourseDto, undefined);
  }

  @Delete('/delete/:id')
  @HttpCode(HttpStatus.NO_CONTENT)
  @ApiBadRequestResponse()
  @ApiNotFoundResponse()
  @ApiNoContentResponse()
  @ApiUnprocessableEntityResponse()
  @ApiForbiddenResponse()
  @ApiHeader({
    name: 'autharization',
    description: 'Admin token',
    required: true,
  })
  async remove(@Param('id') id: string, @Headers() headers: any) {
    if (await this.verifyToken.verifyAdmin(headers)) {
      return await this.courseService.remove(id);
    }
  }
}
