import { Controller, Get, Param } from '@nestjs/common';
import { ApiOperation, ApiResponse } from '@nestjs/swagger';
import { BlocksService } from './blocks.service';

@Controller('blocks')
export class BlocksController {
  constructor(private readonly blocksService: BlocksService) {}

  @Get('/hash/:id')
  @ApiOperation({
    summary: 'Block API',
    description: 'API to get block by block hash',
  })
  @ApiResponse({
    status: 200,
    description: 'Block search request succeed',
  })
  @ApiResponse({ status: 400, description: 'Bad Request' })
  findByHash(@Param('id') id: string) {
    return this.blocksService.findByHash(id);
  }
}
