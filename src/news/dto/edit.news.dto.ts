import { News } from '../news.service';
import { IsArray, IsNumber, IsOptional, IsString } from 'class-validator';
import { Comment } from '../comments/comments.service';

export class EditNewsDto {
  @IsOptional()
  @IsString()
  title?: string;
  @IsOptional()
  @IsString({
    message: 'Поле description должно быть строкой',
  })
  description?: string;
  @IsOptional()
  @IsString()
  author: string;
  @IsOptional()
  @IsNumber()
  countView?: number;
  @IsOptional()
  @IsArray()
  comments?: Comment[];
  @IsOptional()
  @IsString()
  cover?: string;
}
