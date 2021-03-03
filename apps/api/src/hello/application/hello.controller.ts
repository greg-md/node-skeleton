import { Controller, Get, Inject } from '@nestjs/common';
import { ClientProxy } from '@nestjs/microservices';
import { HelloService } from './hello.service';
import { timeout } from 'rxjs/operators';

@Controller()
export class HelloController {
  constructor(
    private readonly helloService: HelloService,
    @Inject('MICRO_SERVICE') private client: ClientProxy,
  ) {}

  @Get()
  async getHello(): Promise<string> {
    const result = await this.client
      .send<number>({ cmd: 'hello' }, {})
      .pipe(timeout(60000))
      .toPromise();

    await this.client.emit<number>('hello_sent', result).toPromise();

    return this.helloService.getHello();
  }
}
