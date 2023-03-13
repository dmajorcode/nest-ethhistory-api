import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import * as Sentry from '@sentry/node';
import { Model } from 'mongoose';
import { BlocksDocument } from 'src/schemas/blocks.schema';
import { LogsDocument } from 'src/schemas/logs.schema';
import { TxReceiptsDocument } from 'src/schemas/txReceipts.schema';

@Injectable()
export class BlocksService {
  constructor(
    @InjectModel('Blocks') private readonly blocksModel: Model<BlocksDocument>,
    @InjectModel('TxReceipts')
    private readonly txReceiptsModel: Model<TxReceiptsDocument>,
    @InjectModel('Logs') private readonly logsModel: Model<LogsDocument>,
  ) {}

  async findByHash(id: string): Promise<any | string> {
    try {
      const targetBlock = await this.blocksModel.findOne({ hash: id });
      if (targetBlock) {
        const data = await this.blocksModel.aggregate([
          {
            $match: {
              hash: id,
            },
          },
          {
            $unwind: {
              path: '$transactions',
            },
          },
          {
            $lookup: {
              from: 'txreceipts',
              let: {
                transactions: '$transactions',
              },
              pipeline: [
                {
                  $match: {
                    $expr: {
                      $eq: ['$$transactions', '$transactionHash'],
                    },
                  },
                },
              ],
              as: 'aggregate',
            },
          },
          {
            $unwind: {
              path: '$aggregate',
            },
          },
          {
            $group: {
              _id: '$hash',
              baseFeePerGas: {
                $first: '$baseFeePerGas',
              },
              difficulty: {
                $first: '$difficulty',
              },
              extraData: {
                $first: '$extraData',
              },
              gasLimit: {
                $first: '$gasLimit',
              },
              gasUsed: {
                $first: '$gasUsed',
              },
              hash: {
                $first: '$hash',
              },
              logsBloom: {
                $first: '$logsBloom',
              },
              miner: {
                $first: '$miner',
              },
              mixHash: {
                $first: '$mixHash',
              },
              nonce: {
                $first: '$nonce',
              },
              number: {
                $first: '$number',
              },
              parentHash: {
                $first: '$parentHash',
              },
              receiptsRoot: {
                $first: '$receiptsRoot',
              },
              sha3Uncles: {
                $first: '$sha3Uncles',
              },
              size: {
                $first: '$size',
              },
              stateRoot: {
                $first: '$stateRoot',
              },
              timestamp: {
                $first: '$timestamp',
              },
              totalDifficulty: {
                $first: '$totalDifficulty',
              },
              transactions: {
                $push: '$aggregate',
              },
              transactionsRoot: {
                $first: '$transactionsRoot',
              },
              uncles: {
                $first: '$uncles',
              },
              __v: {
                $first: '$__v',
              },
            },
          },
        ]);

        return data;
      }
      return 'Invalid Block Hash';
    } catch (e) {
      Sentry.captureException(e);
    }
  }
}
