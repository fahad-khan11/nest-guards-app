import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { User, UserSchema } from './schema/user.schema';
import { userController } from './user.controller';
import { userService } from './users.service';
import { PassportModule } from '@nestjs/passport';
import { JwtStrategy } from 'src/guards/jwt.strategy';

 
@Module({

   imports : [
    PassportModule,
    MongooseModule.forFeature([
      {
      name : User.name,
      schema : UserSchema
    }
  ])],
  controllers: [userController],
  providers: [userService,JwtStrategy],
  exports: [userService,JwtStrategy],


})
export class UsersModule {}
