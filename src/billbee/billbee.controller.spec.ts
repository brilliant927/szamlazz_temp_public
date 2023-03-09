import { Test, TestingModule } from '@nestjs/testing';
import { BillbeeController } from './billbee.controller';
import { BillbeeService } from './billbee.service';

describe('BillbeeController', () => {
  let controller: BillbeeController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [BillbeeController],
      providers: [BillbeeService],
    }).compile();

    controller = module.get<BillbeeController>(BillbeeController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
