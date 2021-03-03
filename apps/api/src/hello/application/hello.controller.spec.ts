import { Test, TestingModule } from '@nestjs/testing';
import { of } from 'rxjs';
import { mock, SinonMock } from 'sinon';
import { HelloController } from './hello.controller';
import { HelloService } from './hello.service';

describe('HelloController', () => {
  let controller: HelloController;

  const clientProxy = {
    send: () => null,
    emit: () => null,
  };
  let clientProxyMock: SinonMock;

  beforeEach(async () => {
    clientProxyMock = mock(clientProxy);
    const app: TestingModule = await Test.createTestingModule({
      controllers: [HelloController],
      providers: [
        HelloService,
        { provide: 'MICRO_SERVICE', useValue: clientProxy },
      ],
    }).compile();

    controller = app.get<HelloController>(HelloController);
  });

  afterEach(async () => {
    clientProxyMock.restore();
  });

  describe('root', () => {
    it('should return "Hello World!"', async () => {
      const result = 'hello';
      clientProxyMock
        .expects('send')
        .once()
        .withExactArgs({ cmd: 'hello' }, {})
        .returns(of(result));
      clientProxyMock
        .expects('emit')
        .once()
        .withExactArgs('hello_sent', result)
        .returns(of(true));

      expect(await controller.getHello()).toBe('Hello World!');
      clientProxyMock.verify();
    });
  });
});
