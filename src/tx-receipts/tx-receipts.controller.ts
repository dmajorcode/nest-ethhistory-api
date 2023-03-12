import { Controller, Get, Param, Query } from '@nestjs/common';
import { TxReceiptsService } from './tx-receipts.service';

@Controller('tx-receipts')
export class TxReceiptsController {
  constructor(private readonly txReceiptsService: TxReceiptsService) {}

  @Get('/hash/:id')
  findByHash(@Param('id') id: string) {
    return this.txReceiptsService.findByHash(id);
  }

  @Get('address')
  findByFromTo(@Query() query) {
    const { from, to } = query;

    return this.txReceiptsService.findByAddress(from, to);
  }
}
