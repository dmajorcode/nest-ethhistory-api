import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import mongoose, { HydratedDocument, Types } from 'mongoose';
import { Logs } from './logs.schema';

export type TxReceiptsDocument = HydratedDocument<TxReceipts>;

@Schema()
export class TxReceipts {
  @Prop()
  blockHash: string;

  @Prop()
  blockNumber: string;

  @Prop()
  contractAddress: string | null;

  @Prop()
  cumulativeGasUsed: string;

  @Prop()
  effectiveGasPrice: string;

  @Prop()
  from: string;

  @Prop()
  gasUsed: string;

  /** TODO : TRY USING BSON **/
  // @Prop({ type: mongoose.Schema.Types.ObjectId, ref: 'Logs' })
  // logs: Logs[];
  @Prop()
  logs: string[];

  @Prop()
  logsBloom: string;

  @Prop()
  status: string;

  @Prop()
  to: string;

  @Prop()
  transactionHash: string;

  @Prop()
  transactionIndex: string;

  @Prop()
  type: string;
}

export const TxReceiptsSchema = SchemaFactory.createForClass(TxReceipts);
