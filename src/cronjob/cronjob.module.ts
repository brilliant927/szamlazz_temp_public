import { Module } from '@nestjs/common';
import { ScheduleModule } from '@nestjs/schedule';

import { CronjobService } from './cronjob.service';
import { BillbeeModule } from 'src/billbee/billbee.module';
import { SzamlazzModule } from 'src/szamlazz/szamlazz.module';

@Module({
  imports: [ScheduleModule.forRoot(), BillbeeModule, SzamlazzModule],
  controllers: [],
  providers: [CronjobService],
})
export class CronjobModule {}
