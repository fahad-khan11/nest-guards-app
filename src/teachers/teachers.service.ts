import { Injectable, BadRequestException, NotFoundException, Logger } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { CreateTeacherDto } from './dto/create-teacher.dto';
import { Teacher } from './schema/teacher.schema';
import { User, UserRole } from 'src/users/schema/user.schema';

@Injectable()
export class TeacherService {
  private readonly logger = new Logger(TeacherService.name)
  constructor(
    @InjectModel(Teacher.name) private readonly teacherModel: Model<Teacher>,
    @InjectModel(User.name) private readonly userModel: Model<User>,
  ) {}

  async createTeacher(createTeacherDto: CreateTeacherDto): Promise<Teacher> {
    const { userId, subject, schedule ,profilePic} = createTeacherDto;

    const user = await this.userModel.findById(userId);
    if (!user) {
      throw new NotFoundException('User not found');
    }

    const teacher = new this.teacherModel({ userId, subject, schedule ,profilePic});
    this.logger.log('Creating teacher record with:', { userId, subject, schedule, profilePic });
    return teacher.save();
  }

  async getAllTeachers(): Promise<Teacher[]> {
    return this.teacherModel.find().populate('userId', 'name email role').exec();
  }

  async getTeacherById(id: string): Promise<Teacher> {
    const teacher = await this.teacherModel.findById(id).populate('userId');
    if (!teacher) {
      throw new NotFoundException('Teacher not found');
    }
    return teacher;
  }
}