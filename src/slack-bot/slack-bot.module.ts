import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { BlocksSchema } from 'src/schemas/blocks.schema';
import { LogsSchema } from 'src/schemas/logs.schema';
import { TxReceiptsSchema } from 'src/schemas/txReceipts.schema';
import { SlackBotController } from './slack-bot.controller';
import { SlackBotService } from './slack-bot.service';
@Module({
  imports: [
    MongooseModule.forFeature([{ name: 'Blocks', schema: BlocksSchema }]),
    MongooseModule.forFeature([
      { name: 'TxReceipts', schema: TxReceiptsSchema },
    ]),
    MongooseModule.forFeature([{ name: 'Logs', schema: LogsSchema }]),
  ],
  controllers: [SlackBotController],
  providers: [SlackBotService],
})
export class SlackBotModule {}
