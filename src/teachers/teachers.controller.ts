import { Controller, Post, Body, Get, Param, UseGuards, SetMetadata, UseInterceptors, UploadedFile, Logger } from '@nestjs/common';
import { CreateTeacherDto } from './dto/create-teacher.dto';
import { ApiTags, ApiOperation, ApiBearerAuth, ApiConsumes, ApiBody } from '@nestjs/swagger';
import { TeacherService } from './teachers.service';
import { Teacher } from './schema/teacher.schema';
import { JwtAuthGuard } from 'src/guards/auth.guards';
import { RoleGuard } from 'src/guards/role.guards';
import { FileInterceptor } from '@nestjs/platform-express';
import { log } from 'console';
import { MulterService } from 'src/file-upload/multer.service';

@ApiTags('Teachers')
@Controller('teachers')
export class TeacherController {
  private readonly logger = new Logger(TeacherController.name);

  constructor(private readonly teacherService: TeacherService) {
    
  }

  @Post()
  @ApiTags('Teachers')
  @ApiBearerAuth() 
  @UseGuards(JwtAuthGuard, RoleGuard)
  @SetMetadata('role', 'teacher')
  @UseInterceptors(FileInterceptor('profilePic',new MulterService().getOptions()))
  @ApiOperation({ summary: 'Register a new teacher' })
  @ApiConsumes('multipart/form-data')
  @ApiBody({
    description: 'Upload teacher profile picture and other teacher details',
    type: CreateTeacherDto,
  })
  async createTeacher(
    @Body() createTeacherDto: CreateTeacherDto,
    @UploadedFile() file: Express.Multer.File,
  ): Promise<Teacher> {
    if (file) {
      createTeacherDto.profilePic = file.path;
    }
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
