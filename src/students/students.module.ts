import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { Student, StudentSchema } from './schema/student.schema';
import { User, UserSchema } from 'src/users/schema/user.schema';
import { StudentService } from './students.service';
import { StudentController } from './students.controller';
import { MulterService } from 'src/file-upload/multer.service';

@Module({
     imports: [
        MongooseModule.forFeature([
          { name: Student.name, schema: StudentSchema},
          { name: User.name, schema: UserSchema },
        ]),
      ],
  providers: [StudentService,MulterService],
  controllers: [StudentController]
})
export class StudentsModule {}
