import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';
import { ApiProperty } from '@nestjs/swagger';

export enum UserRole {
  admin = 'teacher',
  user= 'student',
}

@Schema()
export class User extends Document {
  
  @ApiProperty({ example: 'John Doe', description: 'User full name' })
  @Prop({ required: true })
  name: string;

  @ApiProperty({ example: 'john@example.com', description: 'User email', uniqueItems: true })
  @Prop({ required: true, unique: true })
  email: string;

  @ApiProperty({ example: 'securepassword123', description: 'User password' })
  @Prop({ required: true })
  password: string;

  @ApiProperty({ example: 'admin', description: 'User role', enum: UserRole })
  @Prop({ type: String, enum: UserRole, })
  role: UserRole;

}

export const UserSchema = SchemaFactory.createForClass(User);
