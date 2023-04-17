import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsString, Length } from 'class-validator';

export class ParolUserDto {
  @IsString()
  @Length(0, 100)
  @IsNotEmpty()
  @ApiProperty({
    name: 'email',
    type: 'string',
    default: 'eshmatbektoshmatov@gmail.com',
    required: true,
  })
  email: string;
}
