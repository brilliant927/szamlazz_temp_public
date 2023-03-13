import { Body, Controller, Post } from '@nestjs/common';
import { ApiOperation } from '@nestjs/swagger';
import { OrderDto } from '../billbee/dtos/order.dto';
import { SzamlazzService } from './szamlazz.service';

@Controller('szamlazz')
export class SzamlazzController {
  constructor(private readonly szamlazzService: SzamlazzService) {}

  @Post()
  @ApiOperation({ summary: 'create a new invoice in szamlazz' })
  async createNewInvoce(@Body() dto: OrderDto): Promise<any> {
    return await this.szamlazzService.createNewInvoce(dto);
  }
}
