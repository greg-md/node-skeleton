import { Module } from '@nestjs/common';
import { MicroController } from './micro.controller';
import { MicroService } from './micro.service';

@Module({
  imports: [],
  controllers: [MicroController],
  providers: [MicroService],
})
export class MicroModule {}
