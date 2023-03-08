import { IsNotEmpty, IsString } from 'class-validator';
import { Role } from '../../auth/role/role.enum';

export class CreateUsersDto {
  @IsNotEmpty()
  @IsString({
    message: 'Поле firstName должно быть строкой',
  })
  firstName: string;
  @IsNotEmpty()
  @IsString()
  email: string;
  @IsNotEmpty()
  @IsString()
  password: string;
  @IsNotEmpty()
  @IsString()
  roles: Role;
}
