import { Controller, Post, Request, Res, UseGuards } from '@nestjs/common';
import { LocalAuthGuard } from './local-auth.guard';
import { AuthService } from './auth.service';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @UseGuards(LocalAuthGuard)
  @Post('login')
  async login(@Request() req, @Res({ passthrough: true }) response) {
    const { access_token, id, role } = await this.authService.login(req.user);
    response.cookie('jwt', access_token, { httpOnly: true });
    response.cookie('userId', id);
    response.cookie('role', role);
    return access_token;
  }
}
