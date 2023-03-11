import { Injectable } from '@nestjs/common';
import { CreateBlockHistoryDto } from './dto/create-block-history.dto';
import { UpdateBlockHistoryDto } from './dto/update-block-history.dto';

@Injectable()
export class BlockHistoryService {
  create(createBlockHistoryDto: CreateBlockHistoryDto) {
    return 'This action adds a new blockHistory';
  }

  findAll() {
    return `This action returns all blockHistory`;
  }

  findOne(id: number) {
    return `This action returns a #${id} blockHistory`;
  }

  update(id: number, updateBlockHistoryDto: UpdateBlockHistoryDto) {
    return `This action updates a #${id} blockHistory`;
  }

  remove(id: number) {
    return `This action removes a #${id} blockHistory`;
  }
}
