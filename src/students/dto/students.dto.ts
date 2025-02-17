import { IsString, IsNotEmpty, IsArray } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

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
  @IsNotEmpty()
  subjects: string[];

  @ApiProperty({ example: 'Grade 10', description: 'Student grade level' })
  @IsString()
  @IsNotEmpty()
  grade: string;
}
