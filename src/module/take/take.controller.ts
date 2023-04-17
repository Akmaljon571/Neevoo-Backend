import {
  Controller,
  Get,
  Post,
  Body,
  Param,
  Delete,
  HttpCode,
  HttpStatus,
  Headers,
} from '@nestjs/common';
import { TakeService } from './take.service';
import { CreateTakeDto } from './dto/create-take.dto';
import {
  ApiBadRequestResponse,
  ApiCreatedResponse,
  ApiHeader,
  ApiNoContentResponse,
  ApiNotFoundResponse,
  ApiOkResponse,
  ApiTags,
} from '@nestjs/swagger';
import { TokenMiddleware } from 'src/middleWare/token.middleware';

@Controller('take')
@ApiTags('Take')
export class TakeController {
  constructor(
    private readonly takeService: TakeService,
    private readonly veridfyToken: TokenMiddleware,
  ) {}

  @Get('/all')
  @ApiOkResponse()
  @ApiNotFoundResponse()
  @ApiBadRequestResponse()
  @ApiHeader({
    name: 'autharization',
    description: 'Admin token',
    required: true,
  })
  @HttpCode(HttpStatus.OK)
  async findAll(@Headers() headers: any) {
    const userId = await this.veridfyToken.verifyAdmin(headers);
    if (userId) {
      return await this.takeService.findAll();
    }
  }

  @Post('/create')
  @ApiBadRequestResponse()
  @ApiCreatedResponse()
  @ApiNotFoundResponse()
  @ApiHeader({
    name: 'autharization',
    description: 'Admin token',
    required: true,
  })
  @HttpCode(HttpStatus.CREATED)
  async create(@Body() body: CreateTakeDto, @Headers() headers: any) {
    const userId = await this.veridfyToken.verifyAdmin(headers);
    if (userId) {
      await this.takeService.create(body);
    }
  }

  @Delete('/delete/:id')
  @ApiBadRequestResponse()
  @ApiNoContentResponse()
  @ApiNotFoundResponse()
  @ApiHeader({
    name: 'autharization',
    description: 'Admin token',
    required: true,
  })
  @HttpCode(HttpStatus.NO_CONTENT)
  async remove(@Param('id') id: string, @Headers() headers: any) {
    const userId = await this.veridfyToken.verifyAdmin(headers);
    if (userId) {
      await this.takeService.remove(id);
    }
  }
}
