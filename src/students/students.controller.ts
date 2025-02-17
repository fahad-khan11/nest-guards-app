import { Controller, Post, Body, Get, Param, UseGuards, SetMetadata, UsePipes } from '@nestjs/common';
import { ApiTags, ApiOperation, ApiBearerAuth } from '@nestjs/swagger';
import { StudentService } from './students.service';
import { Student } from './schema/student.schema';
import { JwtAuthGuard } from 'src/guards/auth.guards';
import { RoleGuard } from 'src/guards/role.guards';
import { CreateStudentDto } from './dto/students.dto';
import { RoleValidationPipe } from 'src/pipes/first.pipes';

@ApiTags('Students')
@Controller('students')
export class StudentController {
  constructor(private readonly studentService: StudentService) {}

  @Post()
  @UsePipes(RoleValidationPipe)
  @ApiBearerAuth()
  @UseGuards(JwtAuthGuard, RoleGuard)
  @SetMetadata('role', 'student')
  @ApiOperation({ summary: 'Register a new student' })
  async registerStudent(@Body() createStudentDto: CreateStudentDto): Promise<Student> {
    return this.studentService.createStudent(createStudentDto);
  }

  @Get()
  @ApiOperation({ summary: 'Get all students' })
  async getStudents(): Promise<Student[]> {
    return this.studentService.getAllStudents();
  }

  @Get(':id')
  @ApiOperation({ summary: 'Get a student by ID' })
  async getStudentById(@Param('id') id: string): Promise<Student> {
    return this.studentService.getStudentById(id);
  }
}
