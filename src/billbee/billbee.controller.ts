import { Controller, Get } from '@nestjs/common';

import { BillbeeService } from './billbee.service';

@Controller('billbee')
export class BillbeeController {
  constructor(private readonly billbeeService: BillbeeService) {}
}
