import { Controller, Get, Inject } from '@nestjs/common';
import { ClientProxy } from '@nestjs/microservices';
import { AppService } from './app.service';
import { timeout } from 'rxjs/operators';

@Controller()
export class AppController {
  constructor(
    private readonly appService: AppService,
    @Inject('MICRO_SERVICE') private client: ClientProxy,
  ) {}

  @Get()
  async getHello(): Promise<string> {
    const result = await this.client
      .send<number>({ cmd: 'hello' }, {})
      .pipe(timeout(60000))
      .toPromise();

    await this.client.emit<number>('hello_sent', result).toPromise();

    return this.appService.getHello();
  }
}
