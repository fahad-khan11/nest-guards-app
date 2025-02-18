import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsString, IsMongoId, IsOptional } from 'class-validator';

export class CreateTeacherDto {
  
  @ApiProperty({ example: '65a1234567890abcd1234567', description: 'Reference to User ID' })
  @IsMongoId()
  @IsNotEmpty()
  userId: string;

  @ApiProperty({ example: 'Mathematics', description: 'Teacher subject' })
  @IsString()
  @IsNotEmpty()
  subject: string;

  @ApiProperty({ example: '10:00 AM - 12:00 PM', description: 'Class schedule' })
  @IsString()
  schedule: string;

  @ApiProperty({ type: 'string', format: 'binary', required: false, description: 'Profile picture file' })
  @IsOptional()
  profilePic?: string;
}
