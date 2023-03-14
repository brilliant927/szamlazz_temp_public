import { Injectable, Logger } from '@nestjs/common';
import { Cron, SchedulerRegistry } from '@nestjs/schedule';

import { BillbeeService } from 'src/billbee/billbee.service';
import { SzamlazzService } from 'src/szamlazz/szamlazz.service';

@Injectable()
export class CronjobService {
  constructor(
    private billbeeService: BillbeeService,
    private szamlazzService: SzamlazzService,
    private schedulerRegistry: SchedulerRegistry,
  ) {}

  private readonly logger = new Logger(CronjobService.name);

  @Cron('01 0 * * *', {
    name: 'fetch_order_history',
  })
  async fetchOrderHistoryCron() {
    const job = this.schedulerRegistry.getCronJob('fetch_order_history');
    job.stop(); // pausing the cron job

    const yesterday = new Date();

    this.logger.log(`${yesterday.toISOString().split('T')[0]} cronjob started`);

    yesterday.setDate(yesterday.getDate() - 1);

    const res = await this.billbeeService.getOrderList({
      minOrderDate: yesterday,
      pageSize: 250,
    });

    let orders = res.Data;

    for (let i = 2; i <= res.Paging.TotalPages; i++) {
      const res = await this.billbeeService.getOrderList({
        minOrderDate: yesterday,
        page: i,
        pageSize: 250,
      });
      orders = [...orders, ...res.Data];
    }

    this.logger.log(`${orders.length} orders are fetched from billbee`);

    for (let j = 0; j < orders.length; j++) {
      try {
        const szamlazzRes = await this.szamlazzService.createNewInvoce(
          orders[j],
        );
        this.logger.log(
          `add order #${orders[j].Id} to szamlazz successed: ${szamlazzRes.invoiceId}`,
        );
      } catch (e) {
        this.logger.log(
          `add order #${orders[j].Id}  to szamlazz failed: ${e.message}`,
        );
      }
    }
  }
}
