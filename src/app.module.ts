import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { MongooseModule } from '@nestjs/mongoose';
import { LoggerModule } from 'nestjs-pino';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { BlockHistoryModule } from './block-history/block-history.module';
import { BlocksModule } from './blocks/blocks.module';
import { BlocksSchema } from './schemas/blocks.schema';
import { LogsSchema } from './schemas/logs.schema';
import { TxReceiptsSchema } from './schemas/txReceipts.schema';

@Module({
  imports: [
    BlockHistoryModule,
    BlocksModule,
    LoggerModule.forRoot(),
    ConfigModule.forRoot({ isGlobal: true }),
    MongooseModule.forRoot(process.env.MONGO_URI),
    MongooseModule.forFeature([{ name: 'Blocks', schema: BlocksSchema }]),
    MongooseModule.forFeature([
      { name: 'TxReceipts', schema: TxReceiptsSchema },
    ]),
    MongooseModule.forFeature([{ name: 'Logs', schema: LogsSchema }]),
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
