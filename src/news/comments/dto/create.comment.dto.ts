import { IsOptional, IsString } from 'class-validator';

export class CreateCommentDto {
  @IsString()
  message: string;
  @IsString()
  author: string;
  @IsString()
  idNews: number;
  @IsOptional()
  @IsString()
  idAnswer?: number;
  @IsOptional()
  @IsString()
  logo?: string;
}
