import { Test, TestingModule } from '@nestjs/testing';
import { TxReceiptsService } from './tx-receipts.service';

describe('TxReceiptsService', () => {
  let service: TxReceiptsService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [TxReceiptsService],
    }).compile();

    service = module.get<TxReceiptsService>(TxReceiptsService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
