import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument } from 'mongoose';

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
