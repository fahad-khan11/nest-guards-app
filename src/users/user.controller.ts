import { Controller, Post, Body, UsePipes } from '@nestjs/common';
import { LoginDto } from './dto/login.dto';
import { ApiTags, ApiOperation, ApiResponse } from '@nestjs/swagger';
import { CreateUserDto } from './dto/signup.dto';
import { userService } from './users.service';
import { RoleValidationPipe } from 'src/pipes/first.pipes';

@ApiTags('Authentication')
@Controller()
export class userController {
  constructor(private readonly authService: userService) {}

  @Post('register')
  @UsePipes(RoleValidationPipe)
  @ApiOperation({ summary: 'User Registration' })
  @ApiResponse({ status: 201, description: 'User registered successfully' })
  async register(@Body() createUserDto: CreateUserDto) {
    return this.authService.register(createUserDto);
  }

  @Post('login')
  @ApiOperation({ summary: 'User Login' })
  @ApiResponse({ status: 200, description: 'User logged in successfully' })
  async login(@Body() loginDto: LoginDto) {
    return this.authService.login(loginDto);
  }
}
