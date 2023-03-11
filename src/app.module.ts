import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { BlockHistoryModule } from './block-history/block-history.module';
import { BlocksModule } from './blocks/blocks.module';

@Module({
  imports: [BlockHistoryModule, BlocksModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
