import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import * as Sentry from '@sentry/node';
import { ethers } from 'ethers';
import { Model } from 'mongoose';
import { BlocksDocument } from 'src/schemas/blocks.schema';
import { LogsDocument } from 'src/schemas/logs.schema';
import { TxReceiptsDocument } from 'src/schemas/txReceipts.schema';
import { blockResult, txLog, txResult } from 'src/utils/interface';
import { getBlockInfo, getTxReceipt } from 'src/utils/queryChain';
@Injectable()
export class ChainHistoryBotService {
  private provider: ethers.providers.InfuraProvider;
  constructor(
    @InjectModel('Blocks') private blocksModel: Model<BlocksDocument>,
    @InjectModel('TxReceipts')
    private txReceiptsModel: Model<TxReceiptsDocument>,
    @InjectModel('Logs') private logsModel: Model<LogsDocument>,
  ) {
    this.provider = new ethers.providers.InfuraProvider(
      process.env.NETWORK,
      process.env.INFURA_API_KEY,
    );

    /** Need to denote this to fetch block data **/
    this.getBlock();
  }
  async getBlock() {
    const blockNumbers: number[] = [];
    try {
      setInterval(async () => {
        const number = await this.provider.getBlockNumber();
        if (!blockNumbers.includes(number)) {
          blockNumbers.push(number);

          /** reorg depth mostly 1 block and max 12 blocks **/
          const checkBlock = '0x' + (blockNumbers.shift() - 12).toString(16);
          const blockInfo: blockResult = await getBlockInfo(checkBlock);
          await this.getTx(blockInfo);
          await this.saveBlock(blockInfo);
        }
      }, 12000);
    } catch (e) {
      Sentry.captureException(e);
    }
  }
  async saveBlock(blockInfo: blockResult) {
    try {
      const created = new this.blocksModel(blockInfo);
      created.save();
    } catch (e) {
      Sentry.captureException(e);
    }
  }

  async getTx(blockInfo: blockResult) {
    try {
      const resTx: string[] = blockInfo.transactions;

      resTx.forEach(async (tx: string) => {
        const txReceipt = await getTxReceipt(tx);
        await this.saveTx(txReceipt);
        await this.getLog(txReceipt);
      });
    } catch (e) {
      Sentry.captureException(e);
    }
  }

  async saveTx(txReceipt: txResult) {
    try {
      const created = new this.txReceiptsModel(txReceipt);
      created.save();
    } catch (e) {
      Sentry.captureException(e);
    }
  }

  async getLog(txReceipt: txResult) {
    try {
      const resLog: txLog[] = txReceipt.logs;
      resLog.forEach(async (log: txLog) => {
        await this.saveLog(log);
      });
    } catch (e) {
      Sentry.captureException(e);
    }
  }
  async saveLog(log: txLog) {
    try {
      const created = new this.logsModel(log);
      created.save();
    } catch (e) {
      Sentry.captureException(e);
    }
  }
}
