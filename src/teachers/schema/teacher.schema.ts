import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document, Types } from 'mongoose';
import { ApiProperty } from '@nestjs/swagger';
import { User } from 'src/users/schema/user.schema';

@Schema()
export class Teacher extends Document {

  @Prop({ type: Types.ObjectId, ref: User.name, required: true })
  userId: Types.ObjectId;

  @Prop({ required: true })
  subject: string;

  @Prop()
  schedule: string;

  @Prop()
  profilePic: string;
}

export const TeacherSchema = SchemaFactory.createForClass(Teacher);
