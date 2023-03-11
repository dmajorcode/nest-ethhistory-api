import { Module } from '@nestjs/common';
import { BlocksService } from './blocks.service';
import { BlocksController } from './blocks.controller';
import { Mongoose, MongooseError } from 'mongoose';
import { MongooseModule } from '@nestjs/mongoose';
import { BlocksSchema } from 'src/schemas/blocks.schema';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: 'Blocks', schema: BlocksSchema }]),
  ],
  controllers: [BlocksController],
  providers: [BlocksService],
})
export class BlocksModule {}
