import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import mongoose, { HydratedDocument, ObjectId } from 'mongoose';

export type LogsDocument = HydratedDocument<Logs>;

@Schema()
export class Logs {
  @Prop()
  address: string;

  @Prop()
  blockHash: string;

  @Prop()
  blockNumber: string;

  @Prop()
  data: string;

  @Prop()
  logIndex: string;

  @Prop()
  removed: boolean;

  @Prop()
  topics: string[];

  @Prop()
  transactionHash: string;

  @Prop()
  transactionIndex: string;
}

export const LogsSchema = SchemaFactory.createForClass(Logs);
