import { Test, TestingModule } from '@nestjs/testing';
import { ChainHistoryBotService } from './chain-history-bot.service';

describe('ChainHistoryBotService', () => {
  let service: ChainHistoryBotService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [ChainHistoryBotService],
    }).compile();

    service = module.get<ChainHistoryBotService>(ChainHistoryBotService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
