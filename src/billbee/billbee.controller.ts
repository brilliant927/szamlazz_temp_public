import { Controller, Get, Query } from '@nestjs/common';
import { ApiOkResponse } from '@nestjs/swagger';

import { BillbeeService } from './billbee.service';
import { OrderListDto } from './dtos/orderList.dto';
import { OrderListGetDto } from './dtos/orderListGet.dto';

@Controller('billbee')
export class BillbeeController {
  constructor(private readonly billbeeService: BillbeeService) {}

  @Get('/orders')
  @ApiOkResponse({ type: OrderListGetDto })
  async getOrderList(@Query() query: OrderListGetDto): Promise<OrderListDto> {
    return await this.billbeeService.getOrderList(query);
  }
}
