import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { Student, StudentSchema } from './schema/student.schema';
import { User, UserSchema } from 'src/users/schema/user.schema';
import { StudentService } from './students.service';
import { StudentController } from './students.controller';

@Module({
     imports: [
        MongooseModule.forFeature([
          { name: Student.name, schema: StudentSchema},
          { name: User.name, schema: UserSchema },
        ]),
      ],
  providers: [StudentService],
  controllers: [StudentController]
})
export class StudentsModule {}
