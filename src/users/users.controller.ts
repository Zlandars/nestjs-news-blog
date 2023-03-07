import { Body, Controller, Post } from '@nestjs/common';
import { CreateUsersDto } from './dto/create.users.dto';
import { UsersService } from './users.service';

@Controller('users')
export class UsersController {
  constructor(private readonly userService: UsersService) {}

  @Post('api')
  async create(@Body() user: CreateUsersDto) {
    return this.userService.create(user);
  }
}
