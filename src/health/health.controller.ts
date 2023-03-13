import { Controller, Get } from '@nestjs/common';
import {
  HealthCheck,
  HealthCheckService,
  HttpHealthIndicator,
} from '@nestjs/terminus';
import { WebClient } from '@slack/web-api';
import { formatServerStatMessage, sendSlack } from 'src/utils/slack';

@Controller('health')
export class HealthController {
  constructor(
    private health: HealthCheckService,
    private http: HttpHealthIndicator, // private readonly healthService: HealthCheckService,
  ) {}

  @Get()
  @HealthCheck()
  async check() {
    const serverCheckBot = new WebClient(
      process.env.SLACK_SERVER_CHECK_BOT_TOKEN,
    );

    const checkInterval = 60 * 60 * 1000;

    setInterval(async () => {
      const currentHealth = this.health.check([
        () => this.http.pingCheck('block-history bot', process.env.URL),
      ]);
      const status = await (await currentHealth).status;
      const text = await formatServerStatMessage(status);
      await sendSlack(
        serverCheckBot,
        text,
        process.env.SLACK_SERVER_CHECK_CHANNEL_NAME,
      );
    }, checkInterval);

    return this.health.check([
      () => this.http.pingCheck('block-history bot', process.env.URL),
    ]);
  }
}
