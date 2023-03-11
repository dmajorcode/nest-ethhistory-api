import { Module } from '@nestjs/common';
import { BlocksService } from './blocks.service';
import { BlocksController } from './blocks.controller';
import { Mongoose, MongooseError } from 'mongoose';
import { MongooseModule } from '@nestjs/mongoose';
import { BlocksSchema } from 'src/schemas/blocks.schema';
import { LogsSchema } from 'src/schemas/logs.schema';
import { TxReceiptsSchema } from 'src/schemas/txReceipts.schema';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: 'Blocks', schema: BlocksSchema }]),
    MongooseModule.forFeature([
      { name: 'TxReceipts', schema: TxReceiptsSchema },
    ]),
    MongooseModule.forFeature([{ name: 'Logs', schema: LogsSchema }]),
  ],
  controllers: [BlocksController],
  providers: [BlocksService],
})
export class BlocksModule {}
