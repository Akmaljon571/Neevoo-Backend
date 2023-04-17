import { IsString } from 'class-validator';
import { Transform } from 'class-transformer';
import { ApiParam, ApiProperty } from '@nestjs/swagger';

export class RegistrUserDto {
  @IsString()
  @Transform(({ value }): string => value.trim())
  @ApiProperty({
    name: 'email',
    type: 'string',
  })
  email: string;

  @IsString()
  @ApiProperty({
    name: 'password',
    type: 'string',
  })
  @Transform(({ value }): string => value.trim())
  password: string;
}
