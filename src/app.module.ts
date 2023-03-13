import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { MongooseModule } from '@nestjs/mongoose';
import { LoggerModule } from 'nestjs-pino';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { BlocksModule } from './blocks/blocks.module';
import { ChainHistoryBotModule } from './chain-history-bot/chain-history-bot.module';
import { BlocksSchema } from './schemas/blocks.schema';
import { LogsSchema } from './schemas/logs.schema';
import { TxReceiptsSchema } from './schemas/txReceipts.schema';
import { SlackBotModule } from './slack-bot/slack-bot.module';
import { TxReceiptsModule } from './tx-receipts/tx-receipts.module';
import { HealthModule } from './health/health.module';
@Module({
  imports: [
    BlocksModule,
    LoggerModule.forRoot(),
    ConfigModule.forRoot({ isGlobal: true }),
    MongooseModule.forRoot(process.env.MONGO_URI),
    MongooseModule.forFeature([{ name: 'Blocks', schema: BlocksSchema }]),
    MongooseModule.forFeature([
      { name: 'TxReceipts', schema: TxReceiptsSchema },
    ]),
    MongooseModule.forFeature([{ name: 'Logs', schema: LogsSchema }]),
    BlocksModule,
    TxReceiptsModule,
    SlackBotModule,
    ChainHistoryBotModule,
    HealthModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
