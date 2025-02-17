import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document, Types } from 'mongoose';
import { ApiProperty } from '@nestjs/swagger';
import { User } from 'src/users/schema/user.schema';

@Schema()
export class Teacher extends Document {

  @ApiProperty({ example: '65a1234567890abcd1234567', description: 'Reference to User ID' })
  @Prop({ type: Types.ObjectId, ref: User.name, required: true })
  userId: Types.ObjectId;

  @ApiProperty({ example: 'Mathematics', description: 'Teacher subject' })
  @Prop({ required: true })
  subject: string;

  @ApiProperty({ example: '10:00 AM - 12:00 PM', description: 'Class schedule' })
  @Prop()
  schedule: string;
}

export const TeacherSchema = SchemaFactory.createForClass(Teacher);
