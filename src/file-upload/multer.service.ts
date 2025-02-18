import { Injectable } from '@nestjs/common';
import {  diskStorage } from 'multer';
import { v4 as uuidv4 } from 'uuid';
import * as path from 'path';
import { Logger } from '@nestjs/common';
import { MulterOptions } from '@nestjs/platform-express/multer/interfaces/multer-options.interface';

@Injectable()
export class MulterService {
  private readonly logger = new Logger(MulterService.name);
  getOptions(): MulterOptions {
    return {
      storage: diskStorage({
        destination: './uploads',
        filename: (req, file, callback) => {
          const fileExt = path.extname(file.originalname);
          const filename = `${uuidv4()}${fileExt}`;
          console.log("i am file extract",fileExt)
          callback(null, filename);
        },
      }),
      fileFilter: (req, file, callback) => {
        const allowedTypes = [
          'image/png',
          'image/jpeg',
          'image/jpg',
          'application/pdf',
          'application/msword',
          'application/vnd.openxmlformats-officedocument.wordprocessingml.document',
          'text/plain',
        ];

        if (allowedTypes.includes(file.mimetype)) {
          callback(null, true);
        } else {
          callback(new Error('Invalid file type! Only images (PNG, JPG), PDFs, DOCX, and TXT files are allowed.'), false);
        }
      },
      limits: { fileSize: 5 * 1024 * 1024 }, 
    };
  }
}
