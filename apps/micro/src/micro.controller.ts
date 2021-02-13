import { Controller, Get } from '@nestjs/common';
import { MicroService } from './micro.service';

@Controller()
export class MicroController {
  constructor(private readonly microService: MicroService) {}

  @Get()
  getHello(): string {
    return this.microService.getHello();
  }
}
