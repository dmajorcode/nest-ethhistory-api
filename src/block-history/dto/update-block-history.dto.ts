import { PartialType } from '@nestjs/mapped-types';
import { CreateBlockHistoryDto } from './create-block-history.dto';

export class UpdateBlockHistoryDto extends PartialType(CreateBlockHistoryDto) {}
