import { Controller, Get, Param } from '@nestjs/common';
import { BlocksService } from './blocks.service';

@Controller('blocks')
export class BlocksController {
  constructor(private readonly blocksService: BlocksService) {}
  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.blocksService.findByHash(id);
  }
}
