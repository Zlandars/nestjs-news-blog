import { IsNumber, IsOptional, IsString } from 'class-validator';

export class CreateCommentDto {
  @IsString()
  message: string;
  @IsString()
  author: string;
  @IsNumber()
  idNews: number;
  @IsOptional()
  @IsNumber()
  idAnswer?: number;
  @IsOptional()
  @IsString()
  logo?: string;
}
