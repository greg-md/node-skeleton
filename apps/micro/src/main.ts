import { NestFactory } from '@nestjs/core';
import { MicroserviceOptions, Transport } from '@nestjs/microservices';
import { MicroModule } from './micro.module';

async function bootstrap() {
  const app = await NestFactory.createMicroservice<MicroserviceOptions>(
    MicroModule,
    {
      transport: Transport.NATS,
      options: {
        url: 'nats://nats:4222',
        queue: 'micro_queue',
      },
    }
  );

  await app.listenAsync();
}
bootstrap();
