import { Injectable, NestMiddleware } from '@nestjs/common';
import { Request, Response, NextFunction } from 'express';

@Injectable()
export class LoggerMiddleware implements NestMiddleware {
  use(req: Request, res: Response, next: NextFunction) {
    console.log('middleware no 1 ');
    
    console.log(`[${new Date().toISOString()}] ${req.method} ${req.url}`);
    next();
  }
}
