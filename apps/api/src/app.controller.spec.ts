import { Test, TestingModule } from '@nestjs/testing';
import { of } from 'rxjs';
import { mock, SinonMock } from 'sinon';
import { AppController } from './app.controller';
import { AppService } from './app.service';

describe('AppController', () => {
  let appController: AppController;

  const clientProxy = {
    send: () => null,
    emit: () => null,
  };
  let clientProxyMock: SinonMock;

  beforeEach(async () => {
    clientProxyMock = mock(clientProxy);
    const app: TestingModule = await Test.createTestingModule({
      controllers: [AppController],
      providers: [
        AppService,
        { provide: 'MICRO_SERVICE', useValue: clientProxy },
      ],
    }).compile();

    appController = app.get<AppController>(AppController);
  });

  afterEach(async () => {
    clientProxyMock.restore();
  });

  describe('root', () => {
    it('should return "Hello World!"', async () => {
      const result = 'hello';
      clientProxyMock.expects('send').once().withExactArgs({ cmd: 'hello' }, {}).returns(of(result));
      clientProxyMock.expects('emit').once().withExactArgs('hello_sent', result).returns(of(true));

      expect(await appController.getHello()).toBe('Hello World!');
      clientProxyMock.verify();
    });
  });
});
