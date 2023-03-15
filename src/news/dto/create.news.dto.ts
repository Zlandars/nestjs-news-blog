import { IsOptional, IsString } from 'class-validator';

export class CreateNewsDto {
  @IsString()
  title: string;
  @IsString({
    message: 'Поле description должно быть строкой',
  })
  description: string;
  @IsOptional()
  @IsString()
  cover: string;
}
