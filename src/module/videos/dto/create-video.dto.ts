import { Type } from 'class-transformer';
import { IsNotEmpty, IsNumber, IsString, Length } from 'class-validator';
export class CreateVideoDto {
  @IsString()
  @Length(0, 100)
  @IsNotEmpty()
  video_text: string;

  @IsString()
  @IsNotEmpty()
  video_duration: string;

  @IsNumber()
  @IsNotEmpty()
  @Type(() => Number)
  sequence: number;

  @IsString()
  @IsNotEmpty()
  video_course: string;
}
