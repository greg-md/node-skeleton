import { Module } from '@nestjs/common';
import { HelloResolver } from './application/hello.resolver';
import { HelloObjectify } from './domain/hello.objectify';
import { HelloPubSub } from './infrastructure/hello.pub-sub';

@Module({
  providers: [
    HelloObjectify,
    HelloPubSub,
    HelloResolver,
  ],
})
export class GqlHelloModule {}
