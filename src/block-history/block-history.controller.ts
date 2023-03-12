import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
} from '@nestjs/common';
import { BlockHistoryService } from './block-history.service';
import { CreateBlockHistoryDto } from './dto/create-block-history.dto';
import { UpdateBlockHistoryDto } from './dto/update-block-history.dto';

@Controller('block-history')
export class BlockHistoryController {
  constructor(private readonly blockHistoryService: BlockHistoryService) {}

  @Post()
  create(@Body() createBlockHistoryDto: CreateBlockHistoryDto) {
    return this.blockHistoryService.create(createBlockHistoryDto);
  }

  @Get()
  findAll() {
    return this.blockHistoryService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.blockHistoryService.findOne(+id);
  }

  @Patch(':id')
  update(
    @Param('id') id: string,
    @Body() updateBlockHistoryDto: UpdateBlockHistoryDto,
  ) {
    return this.blockHistoryService.update(+id, updateBlockHistoryDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.blockHistoryService.remove(+id);
  }
}
