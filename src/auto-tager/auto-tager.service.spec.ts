import { Test, TestingModule } from '@nestjs/testing';
import { AutoTagerService } from './auto-tager.service';

describe('AutoTagerService', () => {
  let service: AutoTagerService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [AutoTagerService],
    }).compile();

    service = module.get<AutoTagerService>(AutoTagerService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
