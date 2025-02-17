import { Injectable, BadRequestException, UnauthorizedException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import * as bcrypt from 'bcrypt';
import { JwtService } from '@nestjs/jwt';
import { User, UserRole } from './schema/user.schema';
import { CreateUserDto } from './dto/signup.dto';
import { LoginDto } from './dto/login.dto';

@Injectable()
export class userService {
  constructor(
    @InjectModel(User.name) private readonly userModel: Model<User>,
    private readonly jwtService: JwtService,
  ) {}

  async register(createUserDto: CreateUserDto): Promise<{ message: string }> {
    const { email, password, name, role } = createUserDto;

    const existingUser = await this.userModel.findOne({ email });
    if (existingUser) {
      throw new BadRequestException('Email is already in use');
    }

    const hashedPassword = await bcrypt.hash(password, 10);
    const newUser = new this.userModel({
      name,
      email,
      password: hashedPassword,
      role: role || UserRole.user, 
    });

    await newUser.save();
    return { message: 'User registered successfully' };
  }

  async login(loginDto: LoginDto): Promise<{ accessToken: string }> {
    const { email, password } = loginDto;

    const user = await this.userModel.findOne({ email });
    if (!user) {
      throw new UnauthorizedException('Invalid email or password');
    }

    const isPasswordValid = await bcrypt.compare(password, user.password);
    if (!isPasswordValid) {
      throw new UnauthorizedException('Invalid email or password');
    }

    const accessToken = await this.generateUserToken(user.id, user.role);
    return { accessToken };
  }

  async generateUserToken(userId: string, role: UserRole): Promise<string> {
    return this.jwtService.sign({ userId, role }, { expiresIn: '10h' });
  }
}
