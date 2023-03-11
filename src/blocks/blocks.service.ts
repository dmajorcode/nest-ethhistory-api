import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { ethers } from 'ethers';
import { Model } from 'mongoose';
import { Blocks, BlocksDocument } from 'src/schemas/blocks.schema';

@Injectable()
export class BlocksService {
  public static provider: ethers.providers.InfuraProvider;
  constructor(
    @InjectModel('Blocks') private blocksModel: Model<BlocksDocument>, // @InjectModel('Blocks') private blocksModel: Model<BlocksDocument>,
  ) {
    this.getBlock();
  }

  async findOne(): Promise<Blocks> {
    const sampleBlock = this.blocksModel.findOne();
    return sampleBlock;
  }

  async getBlock() {
    const provider = new ethers.providers.InfuraProvider(
      process.env.NETWORK,
      process.env.INFURA_API_KEY,
    );
  }
}
