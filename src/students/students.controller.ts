import { Controller, Post, Body, Get, Param, UseGuards, SetMetadata, UsePipes, UseInterceptors, UploadedFile } from '@nestjs/common';
import { ApiTags, ApiOperation, ApiBearerAuth, ApiConsumes, ApiBody } from '@nestjs/swagger';
import { StudentService } from './students.service';
import { Student } from './schema/student.schema';
import { JwtAuthGuard } from 'src/guards/auth.guards';
import { RoleGuard } from 'src/guards/role.guards';
import { CreateStudentDto } from './dto/students.dto';
import { RoleValidationPipe } from 'src/pipes/first.pipes';
import { FileInterceptor } from '@nestjs/platform-express';
import { MulterService } from 'src/file-upload/multer.service';

@ApiTags('Students')
@Controller('students')
export class StudentController {
  constructor(
    private readonly studentService: StudentService,
  ) {}

  @Post()
  @ApiBearerAuth()
  @UseGuards(JwtAuthGuard, RoleGuard)
  @SetMetadata('role', 'student')
  @UseInterceptors(FileInterceptor('profilePic', new MulterService().getOptions()))
  @ApiConsumes('multipart/form-data')
   @ApiBody({
      description: 'Upload student profile picture and other teacher details',
      type: CreateStudentDto,
    })
  @ApiOperation({ summary: 'Register a new student' })
  async createStudent(
    @Body() createStudentDto: CreateStudentDto,
    @UploadedFile() file: Express.Multer.File, 
  ): Promise<Student> {
    console.log(CreateStudentDto);
    
    if (file) {
      createStudentDto.profilePic = file.path;
    }
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
