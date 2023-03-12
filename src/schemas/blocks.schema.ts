import { TransactionReceipt } from '@ethersproject/providers';
import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import mongoose, { HydratedDocument } from 'mongoose';
import { TxReceipts } from './txReceipts.schema';

export type BlocksDocument = HydratedDocument<Blocks>;

@Schema()
export class Blocks {
  @Prop()
  baseFeePerGas: string;

  @Prop()
  difficulty: string;

  @Prop()
  extraData: string;

  @Prop()
  gasLimit: string;

  @Prop()
  gasUsed: string;

  @Prop()
  hash: string;

  @Prop()
  logsBloom: string;

  @Prop()
  miner: string;

  @Prop()
  mixHash: string;

  @Prop()
  nonce: string;

  @Prop()
  number: string;

  @Prop()
  parentHash: string;

  @Prop()
  receiptsRoot: string;

  @Prop()
  sha3Uncles: string;

  @Prop()
  size: string;

  @Prop()
  stateRoot: string;

  @Prop()
  timestamp: string;

  @Prop()
  totalDifficulty: string;

  /** TODO : TRY USING BSON **/
  // @Prop({ type: mongoose.Schema.Types.ObjectId, ref: 'TxReceipts' })
  // transactions: TxReceipts[];
  @Prop()
  transactions: string[];

  @Prop()
  transactionsRoot: string;

  @Prop()
  uncles: string[];
}

export const BlocksSchema = SchemaFactory.createForClass(Blocks);
