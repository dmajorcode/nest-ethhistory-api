import { Controller, Get, Param } from '@nestjs/common';
import { TxReceiptsService } from './tx-receipts.service';

@Controller('tx-receipts')
export class TxReceiptsController {
  constructor(private readonly txReceiptsService: TxReceiptsService) {}

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.txReceiptsService.findByHash(id);
  }
}
