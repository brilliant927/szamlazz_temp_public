import { Test, TestingModule } from '@nestjs/testing';
import { BillbeeService } from './billbee.service';

describe('BillbeeService', () => {
  let service: BillbeeService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [BillbeeService],
    }).compile();

    service = module.get<BillbeeService>(BillbeeService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
