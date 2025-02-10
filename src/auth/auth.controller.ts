import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { AuthService } from './auth.service';
import { LoginDto } from './dto/loginDto';
import { SignupDto } from './dto/signup.dto';
import { RefreshTokenDto } from './dto/refresh-token.dto';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('signup')
  async signup(@Body() signUpDto: SignupDto) {
    this.authService.signup(signUpDto)
  }

  @Post('login')
  async login(@Body() loginDto:LoginDto) {
    return this.authService.login(loginDto);
  }

  @Post('refresh')
  refreshTokens(@Body() refreshTokenDto:RefreshTokenDto) {
    return this.authService.refreshTokens(refreshTokenDto.refreshToken);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateAuthDto: LoginDto) {
    return this.authService.update(+id, updateAuthDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.authService.remove(+id);
  }
}
