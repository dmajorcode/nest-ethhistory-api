import { Test, TestingModule } from '@nestjs/testing';
import { TxReceiptsController } from './tx-receipts.controller';
import { TxReceiptsService } from './tx-receipts.service';

describe('TxReceiptsController', () => {
  let controller: TxReceiptsController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [TxReceiptsController],
      providers: [TxReceiptsService],
    }).compile();

    controller = module.get<TxReceiptsController>(TxReceiptsController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
