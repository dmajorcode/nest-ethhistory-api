import { NestFactory } from '@nestjs/core';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import * as Sentry from '@sentry/node';
import 'dotenv/config';
import { AppModule } from './app.module';
import { WebhookInterceptor } from './slack-bot/slack.interceptor';
async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.useGlobalInterceptors(new WebhookInterceptor());
  Sentry.init({
    dsn: process.env.SENTRY_DSN,
    integrations: [new Sentry.Integrations.Http({ tracing: true })],
    tracesSampleRate: 1.0,
  });

  const config = new DocumentBuilder()
    .setTitle('Block Histroy Bot')
    .setDescription(
      'This bot fetches Block, Tx, Log of recently added blocks on ethereum mainnet',
    )
    .setVersion('1.0')
    .addTag('blocks')
    .build();
  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('api', app, document);

  await app.listen(process.env.PORT);
  console.log(`Server listening on http://localhost:${process.env.PORT}`);
}
bootstrap();
