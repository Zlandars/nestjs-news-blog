import { IsArray, IsOptional, IsString } from 'class-validator';
import { Comment } from '../comments/comments.service';

export class CreateNewsDto {
  @IsString()
  title: string;
  @IsString({
    message: 'Поле description должно быть строкой',
  })
  description: string;
  @IsString()
  author: string;
  @IsOptional()
  @IsString()
  countView: number;
  @IsOptional()
  @IsArray()
  comments?: Comment[];
  @IsOptional()
  @IsString()
  cover?: string;
}
