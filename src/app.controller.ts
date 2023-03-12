import { Controller, Get } from '@nestjs/common';
import { ApiOperation, ApiResponse } from '@nestjs/swagger';
import { AppService } from './app.service';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get('/')
  @ApiOperation({
    summary: 'Health API',
    description: 'API to check health of current service',
  })
  @ApiResponse({
    status: 200,
    description: 'Health check request succeed',
  })
  @ApiResponse({ status: 400, description: 'Bad Request' })
  getHealth(): any {
    return this.appService.getHealth();
  }
}
