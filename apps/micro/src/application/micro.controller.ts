import { LOGGER } from '@app/core';
import { Controller, Inject } from '@nestjs/common';
import { EventPattern, MessagePattern } from '@nestjs/microservices';
import { Logger } from 'winston';
import { MicroService } from './micro.service';

@Controller()
export class MicroController {
  constructor(
    private readonly microService: MicroService,
    @Inject(LOGGER) private readonly logger: Logger,
  ) {}

  @MessagePattern({ cmd: 'hello' })
  hello(): string {
    return this.microService.getHello();
  }

  @EventPattern('hello_sent')
  async handleHelloSent(data: Record<string, unknown>) {
    this.logger.info('Hello event received.', data);
  }
}
