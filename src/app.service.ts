import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { BlocksDocument } from './schemas/blocks.schema';

@Injectable()
export class AppService {
  getHello(): string {
    return 'Hello World!';
  }
}
