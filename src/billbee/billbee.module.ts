import { Module } from '@nestjs/common';
import { HttpModule } from '@nestjs/axios';
import { BillbeeService } from './billbee.service';
import { BillbeeController } from './billbee.controller';

@Module({
  imports: [HttpModule],
  controllers: [BillbeeController],
  providers: [BillbeeService],
})
export class BillbeeModule {}
