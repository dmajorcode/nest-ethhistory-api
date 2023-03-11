import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Blocks, BlocksDocument } from 'src/schemas/blocks.schema';

@Injectable()
export class BlocksService {
  constructor(
    @InjectModel('Blocks') private blocksModel: Model<BlocksDocument>, // @InjectModel('Blocks') private blocksModel: Model<BlocksDocument>,
  ) {
    this.print();
  }

  async print(): Promise<Blocks> {
    const sampleBlock = await this.blocksModel.findOne();

    return sampleBlock;
  }
}
