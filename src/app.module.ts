import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { BillbeeModule } from './billbee/billbee.module';
import { SzamlazzModule } from './szamlazz/szamlazz.module';

@Module({
  imports: [BillbeeModule, SzamlazzModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
