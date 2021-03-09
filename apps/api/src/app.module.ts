import { CoreModule } from '@app/core';
import { Module } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { GraphQLModule } from '@nestjs/graphql';
import { GqlHelloModule } from './hello';
import { tabs } from './playground/tabs';

@Module({
  imports: [
    {
      global: true,
      module: CoreModule,
    },
    GraphQLModule.forRootAsync({
      useFactory: (configService: ConfigService) => ({
        debug: configService.get('GRAPHQL_DEBUG') === '1',
        playground:
          configService.get('NODE_ENV') === 'development' ? { tabs } : false,

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
          onConnect: (connectionParams) => connectionParams,
        },
      }),
      inject: [ConfigService],
    }),
    GqlHelloModule,
  ],
})
export class AppModule {}
