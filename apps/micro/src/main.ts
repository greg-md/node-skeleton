import { NestFactory } from '@nestjs/core';
import { MicroserviceOptions, Transport } from '@nestjs/microservices';
import { MicroModule } from './micro.module';

async function bootstrap() {
  const app = await NestFactory.createMicroservice<MicroserviceOptions>(
    MicroModule,
    {
      transport: Transport.NATS,
      options: {
        url: process.env.NATS_URL,
        queue: 'micro_queue',
      },
    },
  );

  // Starts listening for shutdown hooks
  app.enableShutdownHooks();

  await app.listenAsync();
}
bootstrap();
