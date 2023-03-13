import { Module } from '@nestjs/common';
import { SzamlazzService } from './szamlazz.service';
import { SzamlazzController } from './szamlazz.controller';

@Module({
  controllers: [SzamlazzController],
  providers: [SzamlazzService]
})
export class SzamlazzModule {}
