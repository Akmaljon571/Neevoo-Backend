import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsNumber, IsString } from 'class-validator';

export class CreateTakeDto {
  @IsNumber()
  @IsNotEmpty()
  @ApiProperty({
    name: 'month',
    type: 'number',
  })
  month: number;

  @IsString()
  @IsNotEmpty()
  @ApiProperty({
    name: 'price',
    type: 'string',
  })
  price: string;

  @IsString()
  @IsNotEmpty()
  @ApiProperty({
    name: 'user',
    type: 'string',
  })
  user: string;
}
