import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { BillbeeModule } from './billbee/billbee.module';
import { SzamlazzModule } from './szamlazz/szamlazz.module';
import { CronjobModule } from './cronjob/cronjob.module';

@Module({
  imports: [BillbeeModule, SzamlazzModule, CronjobModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
