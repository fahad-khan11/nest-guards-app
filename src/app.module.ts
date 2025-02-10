  import { Module } from '@nestjs/common';
import { AuthModule } from './auth/auth.module';
import { MongooseModule } from '@nestjs/mongoose';
import { JwtModule } from '@nestjs/jwt';
import { AppService } from './app.service';

  @Module({
    imports: [
      JwtModule.register({global:true,secret : '123'}),
      MongooseModule.forRoot('mongodb://localhost/auth-database00'),
      AuthModule
    ],
    controllers: [],
    providers: [AppService],
  })
  export class AppModule {}
