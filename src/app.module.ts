import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { MongooseModule } from '@nestjs/mongoose';
import { LoggerModule } from 'nestjs-pino';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { BlocksModule } from './blocks/blocks.module';
import { BlocksSchema } from './schemas/blocks.schema';
import { LogsSchema } from './schemas/logs.schema';
import { TxReceiptsSchema } from './schemas/txReceipts.schema';
import { TxReceiptsModule } from './tx-receipts/tx-receipts.module';

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
    TxReceiptsModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
