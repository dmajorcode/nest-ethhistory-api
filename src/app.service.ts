import { Injectable } from '@nestjs/common';

@Injectable()
export class AppService {
  async getHealth(): Promise<any> {
    return {
      message: `Block History bot is Online: ${process.env.NETWORK}`,
      uptime: process.uptime(),
    };
  }
}
