import { LOGGER } from '@app/core';
import { Test, TestingModule } from '@nestjs/testing';
import { MicroController } from './micro.controller';
import { MicroService } from './micro.service';

describe('MicroController', () => {
  let microController: MicroController;

  const logger = {
    info: () => null,
  };

  beforeEach(async () => {
    const app: TestingModule = await Test.createTestingModule({
      controllers: [MicroController],
      providers: [MicroService, { provide: LOGGER, useValue: logger }],
    }).compile();

    microController = app.get<MicroController>(MicroController);
  });

  describe('root', () => {
    it('should return "Hello World from Micro!"', () => {
      expect(microController.hello()).toBe('Hello World from Micro!');
    });
  });
});
