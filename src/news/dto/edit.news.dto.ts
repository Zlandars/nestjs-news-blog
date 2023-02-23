import { IsArray, IsNumber, IsOptional, IsString } from 'class-validator';
import { Comment } from '../comments/comments.service';

export class EditNewsDto {
  @IsNumber()
  id?: any;
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
  @IsString()
  countView?: number;
  @IsOptional()
  @IsArray()
  comments?: Comment[];
  @IsOptional()
  @IsString()
  cover?: string;
}
