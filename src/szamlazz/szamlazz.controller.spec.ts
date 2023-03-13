import { Test, TestingModule } from '@nestjs/testing';
import { SzamlazzController } from './szamlazz.controller';
import { SzamlazzService } from './szamlazz.service';

describe('SzamlazzController', () => {
  let controller: SzamlazzController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [SzamlazzController],
      providers: [SzamlazzService],
    }).compile();

    controller = module.get<SzamlazzController>(SzamlazzController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
