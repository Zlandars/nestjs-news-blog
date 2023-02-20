import { IsNumber, IsOptional, IsString } from 'class-validator';

export class EditCommentDto {
  @IsNumber()
  id: number;
  @IsString()
  message?: string;
  @IsString()
  author?: string;
  @IsNumber()
  idNews?: number;
  @IsNumber()
  idAnswer?: number;
  @IsOptional()
  @IsString()
  logo?: string;
}
