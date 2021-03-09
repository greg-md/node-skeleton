import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { ConfigService } from '@nestjs/config';
import { ClientsModule, Transport } from '@nestjs/microservices';
import { PubSubEngine } from 'graphql-subscriptions';
import { connect } from 'nats';
import { LOGGER } from './domain/logger';
import { MICRO_SERVICE } from './domain/micro-service';
import { NatsPubSub } from './infrastructure/nats.pub-sub';
import { createLoggerFactory } from './infrastructure/winston.logger';

@Module({
  imports: [
    ConfigModule.forRoot(),
    ClientsModule.registerAsync([
      {
        name: MICRO_SERVICE,
        imports: [ConfigModule],
        useFactory: (configService: ConfigService) => ({
          transport: Transport.NATS,
          options: {
            url: configService.get('NATS_URL'),
            queue: 'micro_queue',
          },
        }),
        inject: [ConfigService],
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
    {
      provide: LOGGER,
      useFactory: (configService: ConfigService) => {
        return createLoggerFactory('Main', configService);
      },
      inject: [ConfigService],
    },
  ],
  exports: [ConfigModule, ClientsModule, PubSubEngine, LOGGER],
})
export class CoreModule {}
