import { Controller } from '@nestjs/common';
import { EventPattern, MessagePattern } from '@nestjs/microservices';
import { MicroService } from './micro.service';

@Controller()
export class MicroController {
  constructor(private readonly microService: MicroService) {}

  @MessagePattern({ cmd: 'hello' })
  hello(): string {
    console.log('Hello command received.');
    return this.microService.getHello();
  }

  @EventPattern('hello_sent')
  async handleHelloSent(data: Record<string, unknown>) {
    console.log('Hello event received.', data);
  }
}
