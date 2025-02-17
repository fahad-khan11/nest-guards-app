import { PipeTransform, Injectable, BadRequestException } from '@nestjs/common';

@Injectable()
export class RoleValidationPipe implements PipeTransform {    
  transform(value: any) {
    if (value.role !== 'student' && value.role !== 'teacher') {
      throw new BadRequestException('Role must be either student or teacher');
      
    }
    console.log('Inside the pipe - Received data:', value.role)
    return value;
  }
}
