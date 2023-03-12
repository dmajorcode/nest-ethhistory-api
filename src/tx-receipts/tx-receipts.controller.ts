import { Controller, Get, Param, Query } from '@nestjs/common';
import { ApiOperation, ApiQuery, ApiResponse, ApiTags } from '@nestjs/swagger';
import { TxReceiptsService } from './tx-receipts.service';

@Controller('tx-receipts')
@ApiTags('Transaction API')
export class TxReceiptsController {
  constructor(private readonly txReceiptsService: TxReceiptsService) {}

  @Get('/hash/:id')
  @ApiOperation({
    summary: 'Transaction API',
    description: 'API to get transaction by transaction hash',
  })
  @ApiResponse({
    status: 200,
    description: 'Tx search request succeed',
  })
  @ApiResponse({ status: 400, description: 'Bad Request' })
  findByHash(@Param('id') id: string) {
    return this.txReceiptsService.findByHash(id);
  }

  @Get('address')
  @ApiOperation({
    summary: 'Tx API',
    description: 'API to get transaction by two contractaddresses(from, to)',
  })
  @ApiResponse({
    status: 200,
    description: 'Tx search request succeed',
  })
  @ApiResponse({ status: 400, description: 'Bad Request' })
  @ApiQuery({
    name: 'from',
    required: false,
    description: 'Contractaddress that created transaction',
  })
  @ApiQuery({
    name: 'to',
    required: false,
    description: 'Contractaddress that received transaction',
  })
  findByFromTo(@Query() query) {
    const { from, to } = query;

    return this.txReceiptsService.findByAddress(from, to);
  }
}
