import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import axios from 'axios';
import axiosRetry from 'axios-retry';
import { ethers } from 'ethers';
import { Model } from 'mongoose';
import { check } from 'prettier';
import { Blocks, BlocksDocument } from 'src/schemas/blocks.schema';
import { getBlockTx } from 'src/utils/getBlocks';
import { blockResponse, blockResult } from 'src/utils/interface';

@Injectable()
export class BlocksService {
  public static provider: ethers.providers.InfuraProvider;
  constructor(
    @InjectModel('Blocks') private blocksModel: Model<BlocksDocument>, // @InjectModel('Blocks') private blocksModel: Model<BlocksDocument>,
  ) {
    this.getBlockTxLog();
  }

  async findOne(): Promise<Blocks> {
    const sampleBlock = this.blocksModel.findOne();
    return sampleBlock;
  }

  async getBlockTxLog() {
    const provider = new ethers.providers.InfuraProvider(
      process.env.NETWORK,
      process.env.INFURA_API_KEY,
    );
    const blockNumbers: number[] = [];

    setInterval(async () => {
      const number = await provider.getBlockNumber();
      if (!blockNumbers.includes(number)) {
        blockNumbers.push(number);

        /** reorg depth mostly 1 block and max 12 blocks **/
        // TODO : number는 계속 받고 숫자가 작아지면 reorg인 것으로 추가 수정
        const checkBlock = '0x' + (blockNumbers.shift() - 12).toString(16);
        await getBlockTx(checkBlock);
      }
    }, 12000);
  }
}
