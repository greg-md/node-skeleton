import { Module } from '@nestjs/common';
import { HelloController } from './application/hello.controller';
import { HelloResolver } from './application/hello.resolver';
import { HelloService } from './application/hello.service';
import { HelloObjectify } from './domain/hello.objectify';
import { HelloPubSub } from './infrastructure/hello.pub-sub';

@Module({
  providers: [
    HelloObjectify,
    HelloPubSub,
    HelloService,

    HelloResolver,
  ],
  controllers: [
    HelloController,
  ]
})
export class GqlHelloModule {}
