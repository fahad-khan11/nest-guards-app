import { MiddlewareConsumer, Module, NestModule } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { JwtModule } from '@nestjs/jwt';
import { AppService } from './app.service';
import { UsersModule } from './users/users.module';
import { TeacherModule } from './teachers/teachers.module';
import { StudentsModule } from './students/students.module';
import { LoggerMiddleware } from './middlewares/create.middlware';

  @Module({
    
    imports: [
      JwtModule.register({
        global:true,
        secret : '1234',
        signOptions: { expiresIn: '1h' },
      },
      ),
      MongooseModule.forRoot('mongodb://localhost/auth-database00'),
      UsersModule,
      TeacherModule,
      StudentsModule,
    ],
    controllers: [],
    providers: [AppService]
  })
  export class AppModule implements NestModule {
    configure(consumer: MiddlewareConsumer) {
      consumer.apply(LoggerMiddleware).forRoutes('*'); 
    }
  }
