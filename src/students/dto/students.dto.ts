import { IsString, IsNotEmpty, IsArray, IsOptional, ArrayNotEmpty } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';
import { Transform } from 'class-transformer';

export class CreateStudentDto {
  @ApiProperty({ example: '65df1a2e5a4b2c001f3e6d8a', description: 'User ID from the User schema' })
  @IsString()
  @IsNotEmpty()
  userId: string;

  @ApiProperty({ example: 'STU12345', description: 'Unique registration number' })
  @IsString()
  @IsNotEmpty()
  regNo: string;

  @ApiProperty({ example: ['Math', 'Science'], description: 'List of subjects' })
  @IsArray()
  @ArrayNotEmpty()
  @Transform(({ value }) => (Array.isArray(value) ? value : [value])) // Make sure subjects are treated as an array
  subjects: string[];

  @ApiProperty({ example: 'Grade 10', description: 'Student grade level' })
  @IsString()
  @IsNotEmpty()
  grade: string;

  @ApiProperty({ type: 'string', format: 'binary', required: false, description: 'Profile picture file' })
  @IsOptional()
  @IsString()
  profilePic?: string;
}
