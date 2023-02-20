import { IsNumber, IsOptional, IsString, ValidateIf } from 'class-validator';

export class EditCommentDto {
  @IsNumber()
  id: number;
  @IsString()
  // @ValidateIf((o) => o.message)
  message: string;
  @IsString()
  // @ValidateIf((o) => o.author)
  author: string;
  @IsNumber()
  @IsOptional()
  // @ValidateIf((o) => o.idAnswer)
  idAnswer: number;
  @IsString()
  @IsOptional()
  // @ValidateIf((o) => o.logo)
  logo?: string;
}
