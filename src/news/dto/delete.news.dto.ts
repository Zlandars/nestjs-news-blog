import { IsString } from 'class-validator';

export class DeleteNewsDto {
  @IsString()
  id: number;
}
