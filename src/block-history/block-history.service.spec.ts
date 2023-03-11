import { Test, TestingModule } from '@nestjs/testing';
import { BlockHistoryService } from './block-history.service';

describe('BlockHistoryService', () => {
  let service: BlockHistoryService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [BlockHistoryService],
    }).compile();

    service = module.get<BlockHistoryService>(BlockHistoryService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
