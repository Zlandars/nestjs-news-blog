import {
  Body,
  Controller,
  Get,
  Param,
  ParseIntPipe,
  Patch,
  Post,
  Render,
  UseGuards,
} from '@nestjs/common';
import { CreateUsersDto } from './dto/create.users.dto';
import { UsersService } from './users.service';
import { UsersEntity } from './users.entity';
import { EditUsersDto } from './dto/edit.users.dto';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';
import { Role } from '../auth/role/role.enum';
import { Roles } from '../auth/role/roles.decorator';
import { AuthService } from '../auth/auth.service';

@Controller('users')
export class UsersController {
  constructor(
    private readonly userService: UsersService,
    private readonly authService: AuthService,
  ) {}

  @Post('api')
  async create(@Body() user: CreateUsersDto) {
    return this.userService.create(user);
  }

  @Get('login')
  @Render('users/login-profile')
  loginView() {
    return;
  }

  @Get('edit/:userId')
  @Render('users/edit-profile')
  async editView(
    @Param('userId', ParseIntPipe) userId: number,
  ): Promise<UsersEntity> {
    return this.userService.findById(userId);
  }

  @UseGuards(JwtAuthGuard)
  @Roles(Role.User)
  @Patch('api/edit/:userId')
  async edit(
    @Param('userId', ParseIntPipe) userId,
    @Body() body: EditUsersDto,
  ) {
    return this.userService.edit(userId, body);
  }
}
