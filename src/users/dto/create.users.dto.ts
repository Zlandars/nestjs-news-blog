import { IsNotEmpty, IsString } from 'class-validator';

export class CreateUsersDto {
  @IsNotEmpty()
  @IsString({
    message: 'Поле description должно быть строкой',
  })
  firstName: string;
}
