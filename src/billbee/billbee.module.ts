import { Module } from '@nestjs/common';
import { BillbeeService } from './billbee.service';
import { BillbeeController } from './billbee.controller';

@Module({
  controllers: [BillbeeController],
  providers: [BillbeeService]
})
export class BillbeeModule {}
