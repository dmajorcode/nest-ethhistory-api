import { Test, TestingModule } from '@nestjs/testing';
import { BlockHistoryController } from './block-history.controller';
import { BlockHistoryService } from './block-history.service';

describe('BlockHistoryController', () => {
  let controller: BlockHistoryController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [BlockHistoryController],
      providers: [BlockHistoryService],
    }).compile();

    controller = module.get<BlockHistoryController>(BlockHistoryController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
