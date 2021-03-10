import { DynamicModule, Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { ConfigService } from '@nestjs/config';
import { ClientsModule, Transport } from '@nestjs/microservices';
import { PubSubEngine } from 'graphql-subscriptions';
import { connect } from 'nats';
import { LOGGER } from './domain/logger';
import { MICRO_SERVICE } from './domain/micro-service';
import { NatsPubSub } from './infrastructure/nats.pub-sub';
import { createLoggerFactory } from './infrastructure/winston.logger';

export type CoreModuleOptions = {
  loggerLabel?: string;
};

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
  ],
  exports: [ConfigModule, ClientsModule, PubSubEngine],
})
export class CoreModule {
  static forRoot(options: CoreModuleOptions): DynamicModule {
    return {
      global: true,
      module: CoreModule,
      providers: [
        {
          provide: LOGGER,
          useFactory: (configService: ConfigService) => {
            return createLoggerFactory(options.loggerLabel || 'Main', configService);
          },
          inject: [ConfigService],
        },
      ],
      exports: [
        LOGGER,
      ]
    };
  }
}
