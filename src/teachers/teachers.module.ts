import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { Teacher, TeacherSchema } from './schema/teacher.schema';
import { User, UserSchema, } from 'src/users/schema/user.schema';
import { TeacherService } from './teachers.service';
import { TeacherController } from './teachers.controller';
import { MulterService } from 'src/file-upload/multer.service';

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: Teacher.name, schema: TeacherSchema},
      { name: User.name, schema: UserSchema },
    ]),
  ],
  controllers: [TeacherController],
  providers: [TeacherService,MulterService],
})
export class TeacherModule {}
