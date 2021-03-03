import { CoreModule } from '@app/core';
import { Module } from '@nestjs/common';
import { MicroController } from './application/micro.controller';
import { MicroService } from './application/micro.service';

@Module({
  imports: [CoreModule],
  controllers: [MicroController],
  providers: [MicroService],
})
export class MicroModule {}
