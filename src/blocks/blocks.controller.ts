import { Controller, Get } from '@nestjs/common';
import { BlocksService } from './blocks.service';

@Controller('blocks')
export class BlocksController {
  constructor(private readonly blocksService: BlocksService) {}
  @Get()
  findOne() {
    return this.blocksService.findOne();
  }
}
