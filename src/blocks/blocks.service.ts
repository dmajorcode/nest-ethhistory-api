import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import axios from 'axios';
import axiosRetry from 'axios-retry';
import { ethers } from 'ethers';
import { Model } from 'mongoose';
import { check } from 'prettier';
import { Blocks, BlocksDocument } from 'src/schemas/blocks.schema';
import { LogsDocument } from 'src/schemas/logs.schema';
import { TxReceiptsDocument } from 'src/schemas/txReceipts.schema';
import { getBlock, getTxReceipt } from 'src/utils/getBlocks';
import {
  blockResponse,
  blockResult,
  txLog,
  txResult,
} from 'src/utils/interface';

@Injectable()
export class BlocksService {
  public static provider: ethers.providers.InfuraProvider;
  constructor(
    @InjectModel('Blocks') private blocksModel: Model<BlocksDocument>,
    @InjectModel('TxReceipts')
    private txReceiptsModel: Model<TxReceiptsDocument>,
    @InjectModel('Logs') private logsModel: Model<LogsDocument>,
  ) {
    BlocksService.provider = new ethers.providers.InfuraProvider(
      process.env.NETWORK,
      process.env.INFURA_API_KEY,
    );
    this.getBlock();
  }

  async findOne(): Promise<Blocks> {
    const sampleBlock = this.blocksModel.findOne();
    return sampleBlock;
  }

  async getBlock() {
    const blockNumbers: number[] = [];

    setInterval(async () => {
      const number = await BlocksService.provider.getBlockNumber();
      if (!blockNumbers.includes(number)) {
        blockNumbers.push(number);

        /** reorg depth mostly 1 block and max 12 blocks **/
        // TODO : number는 계속 받고 숫자가 작아지면 reorg인 것으로 추가 수정
        const checkBlock = '0x' + (blockNumbers.shift() - 12).toString(16);
        const blockInfo: blockResult = await getBlock(checkBlock);
        await this.getTx(blockInfo);
        await this.saveBlock(blockInfo);
      }
    }, 12000);
  }
  async saveBlock(blockInfo: blockResult) {
    const created = new this.blocksModel(blockInfo);
    created.save();
  }

  async getTx(blockInfo: blockResult) {
    const resTx: string[] = blockInfo.transactions;

    resTx.forEach(async (tx: string) => {
      const txInfo = await getTxReceipt(tx);
      await this.saveTx(txInfo);
      await this.getLog(txInfo);
    });
  }

  async saveTx(txInfo: txResult) {
    const created = new this.txReceiptsModel(txInfo);
    created.save();
  }

  async getLog(txInfo: txResult) {
    const resLog: txLog[] = txInfo.logs;
    resLog.forEach(async (log: txLog) => {
      await this.saveLog(log);
    });
  }
  async saveLog(log: txLog) {
    const created = new this.logsModel(log);
    created.save();
  }
}
