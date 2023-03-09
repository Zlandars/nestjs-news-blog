import { IsNotEmpty, IsNumber, IsOptional, IsString } from 'class-validator';
import { Role } from '../../auth/role/role.enum';
import { Optional } from '@nestjs/common';

export class EditUsersDto {
  @IsOptional()
  @IsNumber()
  id: number;
  @IsNotEmpty()
  @IsString()
  firstName: string;
  @IsNotEmpty()
  @IsString()
  email: string;
  @IsOptional()
  @IsString()
  password: string;
  @Optional()
  @IsString()
  roles: Role;
}
