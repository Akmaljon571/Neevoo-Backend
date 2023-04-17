import { Controller, Get, Headers, HttpCode, HttpStatus } from '@nestjs/common';
import {
  ApiBadRequestResponse,
  ApiHeader,
  ApiNotFoundResponse,
  ApiOkResponse,
  ApiTags,
} from '@nestjs/swagger';
import { TokenMiddleware } from 'src/middleWare/token.middleware';
import { HistoryService } from './history.service';

@Controller('/history')
@ApiTags('History')
export class HistoryControlller {
  constructor(
    private historyService: HistoryService,
    private readonly veridfyToken: TokenMiddleware,
  ) {}

  @Get()
  @ApiOkResponse()
  @ApiNotFoundResponse()
  @ApiBadRequestResponse()
  @ApiHeader({
    name: 'autharization',
    description: 'User token',
    required: true,
  })
  @HttpCode(HttpStatus.OK)
  async get(@Headers() headers: any) {
    const userId = await this.veridfyToken.verifyUser(headers);
    if (userId) {
      return await this.historyService.get(userId);
    }
  }

  @Get('/count')
  @ApiOkResponse()
  @ApiNotFoundResponse()
  @ApiBadRequestResponse()
  @HttpCode(HttpStatus.OK)
  async hisobot() {
    return await this.historyService.hisobot();
  }
}
