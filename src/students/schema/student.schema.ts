import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document, Types } from 'mongoose';
import { ApiProperty } from '@nestjs/swagger';
import { User } from 'src/users/schema/user.schema';

@Schema()
export class Student extends Document {
  @ApiProperty({ example: '60f7cbb9c2b5b814c89b1234', description: 'Reference to User ID' })
  @Prop({ type: Types.ObjectId, ref: User.name, required: true })
  userId: Types.ObjectId;

  @ApiProperty({ example: '123456', description: 'Student Registration Number' })
  @Prop({ required: true })
  regNo: string;

  @ApiProperty({ example: ['Math', 'Science'], description: 'Subjects enrolled' })
  @Prop({ type: [String] })
  subjects: string[];

  @ApiProperty({ example: 'A', description: 'Student Grade' })
  @Prop()
  grade: string;
}

export const StudentSchema = SchemaFactory.createForClass(Student);
