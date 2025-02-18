import { Injectable, BadRequestException, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Student } from './schema/student.schema';
import { User, UserRole } from 'src/users/schema/user.schema';
import { CreateStudentDto } from './dto/students.dto';

@Injectable()
export class StudentService {
  constructor(
    @InjectModel(Student.name) private readonly studentModel: Model<Student>,
    @InjectModel(User.name) private readonly userModel: Model<User>,
  ) {}

  async createStudent(createStudentDto: CreateStudentDto): Promise<Student> {
    const { userId, regNo, grade, subjects ,profilePic} = createStudentDto;

    const user = await this.userModel.findById(userId);
    console.log(user);
    
    if (!user) {
      throw new NotFoundException('User not found');
    }

    const student =new this.studentModel({ userId, regNo, grade, subjects,profilePic});
    return await student.save();
  }

  async getAllStudents(): Promise<Student[]> {
    return this.studentModel.find().populate('userId', 'name email role').exec();
  }

  async getStudentById(id: string): Promise<Student> {
    const student = await this.studentModel.findById(id).populate('userId');
    if (!student) {
      throw new NotFoundException('Student not found');
    }
    return student;
  }
}
