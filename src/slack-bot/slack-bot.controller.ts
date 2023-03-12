import { Controller } from '@nestjs/common';
import { SlackBotService } from './slack-bot.service';

@Controller('slack-bot')
export class SlackBotController {
  constructor(private readonly slackBotService: SlackBotService) {}
}
