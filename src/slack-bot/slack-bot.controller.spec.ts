import { Test, TestingModule } from '@nestjs/testing';
import { SlackBotController } from './slack-bot.controller';
import { SlackBotService } from './slack-bot.service';

describe('SlackBotController', () => {
  let controller: SlackBotController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [SlackBotController],
      providers: [SlackBotService],
    }).compile();

    controller = module.get<SlackBotController>(SlackBotController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
