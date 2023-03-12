import { Controller, Get, Param } from '@nestjs/common';
import { BlocksService } from './blocks.service';

@Controller('blocks')
export class BlocksController {
  constructor(private readonly blocksService: BlocksService) {}
  @Get('/hash/:id')
  findByHash(@Param('id') id: string) {
    return this.blocksService.findByHash(id);
  }
}
