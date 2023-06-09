import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { BlocksSchema } from 'src/schemas/blocks.schema';
import { LogsSchema } from 'src/schemas/logs.schema';
import { TxReceiptsSchema } from 'src/schemas/txReceipts.schema';
import { ChainHistoryBotService } from './chain-history-bot.service';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: 'Blocks', schema: BlocksSchema }]),
    MongooseModule.forFeature([
      { name: 'TxReceipts', schema: TxReceiptsSchema },
    ]),
    MongooseModule.forFeature([{ name: 'Logs', schema: LogsSchema }]),
  ],
  providers: [ChainHistoryBotService],
})
export class ChainHistoryBotModule {}
