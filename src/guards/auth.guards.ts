import { Injectable, CanActivate, ExecutionContext, UnauthorizedException } from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { JwtService } from '@nestjs/jwt';
import { Request } from 'express';

@Injectable()
export class JwtAuthGuard implements CanActivate {
  constructor(private jwtService: JwtService, private reflector: Reflector) {}

  canActivate(context: ExecutionContext): boolean {
    const request = context.switchToHttp().getRequest<Request>();


    const authHeader = request.headers.authorization;
    if (!authHeader) {
      console.log('No Authorization Header');
      throw new UnauthorizedException('Missing token');
    }

    const token = authHeader.split(' ')[1];
    if (!token) {
      console.log('Token is empty or not provided');
      throw new UnauthorizedException('Invalid token');
    }

    try {
      const payload = this.jwtService.verify(token);
      request['user'] = payload; 
      return true;
    } catch (error) {
      throw new UnauthorizedException('Invalid or expired token');
    }
  }
}
