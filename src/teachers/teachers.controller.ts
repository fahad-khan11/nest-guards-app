import { Controller, Post, Body, Get, Param, UseGuards, SetMetadata } from '@nestjs/common';
import { CreateTeacherDto } from './dto/create-teacher.dto';
import { ApiTags, ApiOperation, ApiBearerAuth } from '@nestjs/swagger';
import { TeacherService } from './teachers.service';
import { Teacher } from './schema/teacher.schema';
import { JwtAuthGuard } from 'src/guards/auth.guards';
import { RoleGuard } from 'src/guards/role.guards';

@ApiTags('Teachers')
@Controller('teachers')
export class TeacherController {
  constructor(private readonly teacherService: TeacherService) {}

  @Post()
  @ApiTags('Teachers')
  @ApiBearerAuth() 
  @UseGuards(JwtAuthGuard,RoleGuard)
  @SetMetadata('role','teacher')
  @ApiOperation({ summary: 'Register a new teacher' })
  async createTeacher(@Body() createTeacherDto: CreateTeacherDto): Promise<Teacher> {
    return this.teacherService.createTeacher(createTeacherDto);
  }

  @Get()
  @ApiOperation({ summary: 'Get all teachers' })
  async getTeachers(): Promise<Teacher[]> {
    return this.teacherService.getAllTeachers();
  }

  @Get(':id')
  @ApiOperation({ summary: 'Get a teacher by ID' })
  async getTeacherById(@Param('id') id: string): Promise<Teacher> {
    return this.teacherService.getTeacherById(id);
  }
}
