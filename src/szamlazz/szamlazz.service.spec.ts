import { Test, TestingModule } from '@nestjs/testing';
import { SzamlazzService } from './szamlazz.service';

describe('SzamlazzService', () => {
  let service: SzamlazzService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [SzamlazzService],
    }).compile();

    service = module.get<SzamlazzService>(SzamlazzService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
