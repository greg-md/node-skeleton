import { CoreModule } from '@app/core';
import { Module } from '@nestjs/common';
import { GraphQLModule } from '@nestjs/graphql';
import { ClientsModule, Transport } from '@nestjs/microservices';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { GqlHelloModule } from './hello';
import { tabs } from './playground/tabs';

@Module({
  imports: [
    {
      global: true,
      module: CoreModule,
    },
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
    GraphQLModule.forRoot({
      debug: process.env.GRAPHQL_DEBUG === '1',
      playground: process.env.NODE_ENV === 'development' ? { tabs } : false,

      installSubscriptionHandlers: true,
      autoSchemaFile: 'schema.gql',

      // Middleware to pass request
      context: ({ req, payload, connection }) => {
        const payloadRequest = payload?.request;

        const connectionRequest = {
          headers: connection?.context?.headers || connection?.context || {},
        };

        return { req: req || payloadRequest || connectionRequest };
      },

      subscriptions: {
        // Send client payload to the connection context
        onConnect: connectionParams => connectionParams,
      }
    }),
    GqlHelloModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
