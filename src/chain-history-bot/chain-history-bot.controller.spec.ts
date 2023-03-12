import { Test, TestingModule } from '@nestjs/testing';
import { ChainHistoryBotController } from './chain-history-bot.controller';
import { ChainHistoryBotService } from './chain-history-bot.service';

describe('ChainHistoryBotController', () => {
  let controller: ChainHistoryBotController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [ChainHistoryBotController],
      providers: [ChainHistoryBotService],
    }).compile();

    controller = module.get<ChainHistoryBotController>(ChainHistoryBotController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
