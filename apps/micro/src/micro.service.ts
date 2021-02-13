import { Injectable } from '@nestjs/common';

@Injectable()
export class MicroService {
  getHello(): string {
    return 'Hello World!';
  }
}
