import { Injectable, CanActivate, ExecutionContext, ForbiddenException } from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { User } from 'src/users/schema/user.schema';

@Injectable()
export class RoleGuard implements CanActivate {
  constructor(private reflector: Reflector) {}

  canActivate(context: ExecutionContext): boolean {
    const requiredRole = this.reflector.get<string>('role', context.getHandler());
    console.log(requiredRole);
    
    if (!requiredRole) {
      return true;
    }

    const request = context.switchToHttp().getRequest();
    const user: User = request.user;
    

    if (!user) {
      throw new ForbiddenException('User not authenticated');
    }

    if (user.role !== requiredRole) {
      throw new ForbiddenException(`Access denied. Required role: ${requiredRole}`);
    }

    return true;
  }
}
