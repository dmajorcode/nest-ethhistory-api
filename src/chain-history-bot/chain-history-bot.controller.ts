import { Controller } from '@nestjs/common';
import { ChainHistoryBotService } from './chain-history-bot.service';

@Controller('chain-history-bot')
export class ChainHistoryBotController {
  constructor(private readonly chainHistoryBotService: ChainHistoryBotService) {}
}
