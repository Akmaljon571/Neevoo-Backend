import { PartialType } from '@nestjs/swagger';
import { CreateVideoDto } from './create-video.dto';
import {
  IsNotEmpty,
  IsString,
  IsOptional,
  Length,
  IsNumber,
} from 'class-validator';
import { Type } from 'class-transformer';
export class UpdateVideoDto extends PartialType(CreateVideoDto) {
  @IsString()
  @Length(0, 100)
  @IsNotEmpty()
  @IsOptional()
  video_text: string;

  @IsString()
  @IsNotEmpty()
  @IsOptional()
  video_duration: string;

  @IsNumber()
  @IsNotEmpty()
  @IsOptional()
  @Type(() => Number)
  sequence: number;

  @IsString()
  @IsNotEmpty()
  @IsOptional()
  video_course: string;
}
