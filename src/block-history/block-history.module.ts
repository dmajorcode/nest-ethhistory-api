import { Module } from '@nestjs/common';
import { BlockHistoryService } from './block-history.service';
import { BlockHistoryController } from './block-history.controller';

@Module({
  controllers: [BlockHistoryController],
  providers: [BlockHistoryService]
})
export class BlockHistoryModule {}
