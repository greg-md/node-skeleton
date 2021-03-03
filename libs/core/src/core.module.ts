import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { ConfigService } from '@nestjs/config';
import { ClientsModule, Transport } from '@nestjs/microservices';
import { PubSubEngine } from 'graphql-subscriptions';
import { connect } from 'nats';
import { NatsPubSub } from './infrastructure/nats.pub-sub';

@Module({
  imports: [
    ConfigModule.forRoot(),
    ClientsModule.register([
      {
        name: 'MICRO_SERVICE',
        transport: Transport.NATS,
        options: {
          url: process.env.NATS_URL,
          queue: 'micro_queue',
        },
      },
    ]),
  ],
  providers: [
    {
      provide: PubSubEngine,
      useFactory: (configService: ConfigService) => {
        return new NatsPubSub(connect(configService.get('NATS_URL')));
      },
      inject: [ConfigService],
    },
  ],
  exports: [ConfigModule, ClientsModule, PubSubEngine],
})
export class CoreModule {}
