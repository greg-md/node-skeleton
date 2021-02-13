import { Test, TestingModule } from '@nestjs/testing';
import { MicroController } from './micro.controller';
import { MicroService } from './micro.service';

describe('MicroController', () => {
  let microController: MicroController;

  beforeEach(async () => {
    const app: TestingModule = await Test.createTestingModule({
      controllers: [MicroController],
      providers: [MicroService],
    }).compile();

    microController = app.get<MicroController>(MicroController);
  });

  describe('root', () => {
    it('should return "Hello World!"', () => {
      expect(microController.getHello()).toBe('Hello World!');
    });
  });
});
