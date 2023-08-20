import { Test, TestingModule } from '@nestjs/testing';
import { AutoTagerController } from './auto-tager.controller';

describe('AutoTagerController', () => {
  let controller: AutoTagerController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [AutoTagerController],
    }).compile();

    controller = module.get<AutoTagerController>(AutoTagerController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
