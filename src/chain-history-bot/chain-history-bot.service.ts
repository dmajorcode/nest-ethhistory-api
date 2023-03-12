import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
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
    /** TODO : connection test and delete same function in appservice **/
    /** Need to denote this to fetch block data **/
    // this.getBlock();
  }
  async getBlock() {
    const blockNumbers: number[] = [];

    setInterval(async () => {
      const number = await this.provider.getBlockNumber();
      if (!blockNumbers.includes(number)) {
        blockNumbers.push(number);

        /** reorg depth mostly 1 block and max 12 blocks **/
        // TODO : number는 계속 받고 숫자가 작아지면 reorg인 것으로 추가 수정
        const checkBlock = '0x' + (blockNumbers.shift() - 12).toString(16);
        const blockInfo: blockResult = await getBlockInfo(checkBlock);
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
      const txReceipt = await getTxReceipt(tx);
      await this.saveTx(txReceipt);
      await this.getLog(txReceipt);
    });
  }

  async saveTx(txReceipt: txResult) {
    const created = new this.txReceiptsModel(txReceipt);
    created.save();
  }

  async getLog(txReceipt: txResult) {
    const resLog: txLog[] = txReceipt.logs;
    resLog.forEach(async (log: txLog) => {
      await this.saveLog(log);
    });
  }
  async saveLog(log: txLog) {
    const created = new this.logsModel(log);
    created.save();
  }
}
