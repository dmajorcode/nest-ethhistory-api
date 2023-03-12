import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { BlocksDocument } from 'src/schemas/blocks.schema';
import { LogsDocument } from 'src/schemas/logs.schema';
import { TxReceiptsDocument } from 'src/schemas/txReceipts.schema';

@Injectable()
export class TxReceiptsService {
  constructor(
    @InjectModel('Blocks') private readonly blocksModel: Model<BlocksDocument>,
    @InjectModel('TxReceipts')
    private readonly txReceiptsModel: Model<TxReceiptsDocument>,
    @InjectModel('Logs') private readonly logsModel: Model<LogsDocument>,
  ) {}

  async findByHash(id: string): Promise<any | string> {
    const targetTx = await this.txReceiptsModel.findOne({
      transactionHash: id,
    });

    if (targetTx) {
      return targetTx;
    }
    return 'Invalid Transaction Hash';
  }

  async findByAddress(
    from: string | undefined,
    to: string | undefined,
  ): Promise<any | string> {
    const targetTx =
      from != undefined && to != undefined
        ? await this.txReceiptsModel.find({
            from,
            to,
          })
        : from != undefined
        ? await this.txReceiptsModel.find({
            from,
          })
        : to != undefined
        ? await this.txReceiptsModel.find({
            to,
          })
        : null;

    if (targetTx && targetTx.length > 0) {
      return targetTx;
    }
    return 'Invalid Contractaddress';
  }
}
