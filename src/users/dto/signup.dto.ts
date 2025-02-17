import { ApiProperty } from '@nestjs/swagger';
import { IsEmail, IsEnum, IsNotEmpty, MinLength } from 'class-validator';
import { UserRole } from '../schema/user.schema';

export class CreateUserDto {
  
  @ApiProperty({ example: 'John Doe', description: 'User full name' })
  @IsNotEmpty({ message: 'Name is required' })
  name: string;

  @ApiProperty({ example: 'john@example.com', description: 'User email' })
  @IsEmail({}, { message: 'Invalid email format' })
  email: string;

  @ApiProperty({ example: 'securepassword123', description: 'User password', minLength: 6 })
  @IsNotEmpty({ message: 'Password is required' })
  @MinLength(6, { message: 'Password must be at least 6 characters long' })
  password: string;

  @ApiProperty({ example: 'teacher or student ', description: 'User role', enum: UserRole, default: UserRole.admin })
  @IsEnum(UserRole, { message: 'Role must be either teacher or student' })
  role: UserRole;
}
