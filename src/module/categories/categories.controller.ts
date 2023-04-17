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
  UseInterceptors,
  UploadedFile,
  Headers,
} from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
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
import { TokenMiddleware } from 'src/middleWare/token.middleware';
import { googleCloud } from 'src/utils/google-cloud';
import { CategoriesService } from './categories.service';
import { CreateCategoryDto } from './dto/create-category.dto';
import { UpdateCategoryDto } from './dto/update-category.dto';

@Controller('categories')
@ApiTags('Categories')
export class CategoriesController {
  constructor(
    private readonly categoriesService: CategoriesService,
    private readonly verifyToken: TokenMiddleware,
  ) {}

  @Post('create')
  @HttpCode(HttpStatus.CREATED)
  @ApiBody({
    schema: {
      type: 'object',
      required: ['file', 'title', 'description'],
      properties: {
        file: {
          type: 'string',
          format: 'binary',
        },
        title: {
          type: 'string',
        },
        description: {
          type: 'string',
        },
      },
    },
  })
  @ApiConsumes('multipart/form-data')
  @ApiBadRequestResponse()
  @ApiCreatedResponse()
  @UseInterceptors(FileInterceptor('file'))
  @ApiHeader({
    name: 'autharization',
    description: 'Autharization',
    required: true,
  })
  async uploadfile(
    @UploadedFile() file: Express.Multer.File,
    @Body() createCategoryDto: CreateCategoryDto,
    @Headers() headers: any,
  ) {
    const admin = await this.verifyToken.verifyAdmin(headers);
    if (admin) {
      const cat_link: any = googleCloud(file);
      return await this.categoriesService.create(createCategoryDto, cat_link);
    }
  }

  @HttpCode(HttpStatus.OK)
  @ApiNoContentResponse()
  @ApiNotFoundResponse()
  @Get('list')
  findAll() {
    return this.categoriesService.findAll();
  }

  @Get('/:search')
  @ApiBadRequestResponse()
  @ApiNotFoundResponse()
  @ApiOkResponse()
  findByTitle(@Param('search') filterDto: string) {
    if (Object.keys(filterDto).length) {
      return this.categoriesService.searchTitle(filterDto);
    } else {
      return this.categoriesService.findAll();
    }
  }

  @Patch('update/:id')
  @ApiBody({
    schema: {
      type: 'object',
      properties: {
        file: {
          type: 'string',
          format: 'binary',
          default: 'dsfsgf',
        },
        title: {
          type: 'string',
          default: 'Node.js',
        },
        description: {
          type: 'string',
          default: 'Zo`r dasturlash tili',
        },
      },
    },
  })
  @ApiConsumes('multipart/form-data')
  @ApiBadRequestResponse()
  @UseInterceptors(FileInterceptor('file'))
  @ApiHeader({
    name: 'autharization',
    description: 'Autharization',
    required: true,
  })
  @HttpCode(HttpStatus.NO_CONTENT)
  @ApiNoContentResponse()
  @ApiBadRequestResponse()
  @ApiNoContentResponse()
  async uploadUpdateFile(
    @Param('id') id: string,
    @UploadedFile() file: Express.Multer.File,
    @Body() body: UpdateCategoryDto,
    @Headers() headers: any,
  ) {
    await this.verifyToken.verifyAdmin(headers);
    if (file) {
      const cat_link: any = await googleCloud(file);
      return await this.categoriesService.update(id, body, cat_link);
    }
    return await this.categoriesService.update(id, body, undefined);
  }

  @HttpCode(HttpStatus.NO_CONTENT)
  @ApiNoContentResponse()
  @ApiNotFoundResponse()
  @ApiUnprocessableEntityResponse()
  @ApiForbiddenResponse()
  @Delete('/delete/:id')
  @ApiHeader({
    name: 'autharization',
    description: 'Autharization',
    required: true,
  })
  async remove(@Param('id') id: string, @Headers() headers: any) {
    const admin = await this.verifyToken.verifyAdmin(headers);
    if (admin) {
      return await this.categoriesService.remove(id);
    }
  }
}
