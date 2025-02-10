import { BadRequestException, Injectable, UnauthorizedException } from '@nestjs/common';
import { SignupDto } from './dto/signup.dto';
import { User } from './schemas/user.schmema';
import { Model } from 'mongoose';
import { InjectModel } from '@nestjs/mongoose';
import * as bcrypt from 'bcrypt';
import { LoginDto } from './dto/loginDto';
import { generate } from 'rxjs';
import { JwtService } from '@nestjs/jwt';
import { RefreshToken } from './schemas/refresh.token.schema';
import { v4 as uuidv4 } from 'uuid';

@Injectable()

export class AuthService {

constructor(
  @InjectModel(User.name)  private UserModel : Model<User>,
  @InjectModel(RefreshToken.name) private RefeshTokenModel : Model<RefreshToken>,
private jwtService : JwtService,
){}

  async signup(signupData: SignupDto) {
    const{email,password,name} = signupData;
    const emailnUse = await this.UserModel.findOne({
      email : signupData.email,
    });
    if(emailnUse){
      throw new BadRequestException('Email already in use')
    }
    const hashedPassword =await bcrypt.hash(password,10)
    await this.UserModel.create({
      name,
      email,
      password:hashedPassword,
    })
  }

  async login(logindata : LoginDto){
    const{email,password} = logindata;
    const user = await this.UserModel.findOne({email:logindata.email});
    if(!user){
      throw new UnauthorizedException('User not found');
    }
    const passwordMatch = await bcrypt.compare(password,user.password);
    if(!passwordMatch){
      throw new UnauthorizedException("u put the wrong password")
    }
    return this.generateUserToken(user._id)
  }
  async generateUserToken(userId){
    const accessToken =await this.jwtService.sign({userId},{expiresIn:10})
    const refreshToken = uuidv4();
    await this.storeRefreshToken(refreshToken,userId)
    return {
      accessToken,
      refreshToken
    };
  }

  async storeRefreshToken(token:string,userId){
    const expiryDate = new Date();
    expiryDate.setDate(expiryDate.getDate()+3);
     await this.RefeshTokenModel.create({token,userId,expiryDate})
  }
  
  async refreshTokens(refreshToken:string){
    const token = await this.RefeshTokenModel.findOne({
      token : refreshToken,
      expiryDate : {$gte:new Date()}
    })

    if(!token){
      throw new UnauthorizedException()
    }
    return this.generateUserToken(token.userId)
  }


  
  update(id: number, updateAuthDto: LoginDto) {
    return `This action updates a #${id} auth`;
  }

  remove(id: number) {
    return `This action removes a #${id} auth`;
  }
}
