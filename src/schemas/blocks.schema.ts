import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument } from 'mongoose';

export type BlocksDocument = HydratedDocument<Blocks>;

@Schema()
export class Blocks {
  @Prop()
  block: number;
}

export const BlocksSchema = SchemaFactory.createForClass(Blocks);
