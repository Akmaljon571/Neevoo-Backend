import {
  Get,
  Body,
  Patch,
  Post,
  Delete,
  Headers,
  Controller,
  HttpCode,
  HttpStatus,
  Param,
} from '@nestjs/common';
import {
  ApiHeader,
  ApiOkResponse,
  ApiNotFoundResponse,
  ApiBadRequestResponse,
  ApiTags,
  ApiNoContentResponse,
  ApiUnprocessableEntityResponse,
} from '@nestjs/swagger';
import { UsersService } from './users.service';
import { UpdateUserDto } from './dto/update-user.dto';
import { RegistrUserDto } from './dto/registr';
import { ParolUserDto } from './dto/parol';
import { ParolEmailUserDto } from './dto/parol_email';

@ApiTags('Users')
@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @Post('/registr')
  @ApiBadRequestResponse()
  @ApiOkResponse()
  @ApiNotFoundResponse()
  @HttpCode(HttpStatus.OK)
  async registr(@Body() body: RegistrUserDto) {
    return await this.usersService.registr(body);
  }

  @Get('/registr/email/:code')
  @ApiBadRequestResponse()
  @ApiOkResponse()
  @ApiNotFoundResponse()
  @ApiUnprocessableEntityResponse()
  @HttpCode(HttpStatus.OK)
  async registrEmail(@Param('code') param: string) {
    return await this.usersService.registr_email(param);
  }

  @Post('/parol')
  @ApiBadRequestResponse()
  @ApiNotFoundResponse()
  @ApiOkResponse()
  @HttpCode(HttpStatus.OK)
  async parol(@Body() body: ParolUserDto) {
    return await this.usersService.parol(body);
  }

  @Post('/parol/email/:code')
  @ApiBadRequestResponse()
  @ApiNotFoundResponse()
  @ApiOkResponse()
  @HttpCode(HttpStatus.OK)
  async parolEmail(
    @Param('code') param: string,
    @Body() body: ParolEmailUserDto,
  ) {
    return await this.usersService.parol_email(param, body);
  }

  @ApiBadRequestResponse()
  @HttpCode(HttpStatus.OK)
  @Post('/login')
  login(@Body() body: RegistrUserDto) {
    return this.usersService.login(body);
  }

  @Get('/admin/getall')
  @ApiHeader({
    name: 'autharization',
    description: 'Admin token',
    required: true,
  })
  @ApiOkResponse()
  @ApiNotFoundResponse()
  @ApiBadRequestResponse()
  @HttpCode(HttpStatus.OK)
  getAdmin(@Headers() headers: any) {
    return this.usersService.getAdmin(headers);
  }

  @Get('/one')
  @ApiHeader({
    name: 'autharization',
    description: 'User token',
    required: true,
  })
  @ApiOkResponse()
  @ApiNotFoundResponse()
  @ApiBadRequestResponse()
  @HttpCode(HttpStatus.OK)
  getOne(@Headers() headers: any) {
    return this.usersService.getOne(headers);
  }

  @ApiHeader({
    name: 'autharization',
    description: 'User token',
    required: true,
  })
  @ApiBadRequestResponse()
  @HttpCode(HttpStatus.OK)
  @Patch('/update')
  update(@Headers() headers: any, @Body() body: UpdateUserDto) {
    return this.usersService.update(headers, body);
  }

  @ApiHeader({
    name: 'autharization',
    description: 'User token',
    required: true,
  })
  @ApiNotFoundResponse()
  @ApiNoContentResponse()
  @HttpCode(HttpStatus.NO_CONTENT)
  @Delete('/delete')
  deleteUser(@Headers() headers: any) {
    return this.usersService.deleteUser(headers);
  }
}
