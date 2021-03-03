import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { ConfigService } from '@nestjs/config';
import { PubSubEngine } from 'graphql-subscriptions';
import { connect } from 'nats';
import { NatsPubSub } from './infrastructure/nats.pub-sub';

@Module({
  imports: [
    ConfigModule.forRoot(),
  ],
  providers: [
    {
      provide: PubSubEngine,
      useFactory: (configService: ConfigService) => {
        return new NatsPubSub(connect(configService.get('NATS_URL')));
      },
      inject: [ ConfigService ],
    }
  ],
  exports: [
    ConfigModule,
    PubSubEngine,
  ],
})
export class CoreModule {}
