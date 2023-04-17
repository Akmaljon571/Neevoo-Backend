import { IsString } from 'class-validator';

export class GetTaskFilterDto {
  @IsString()
  search: string;
}
