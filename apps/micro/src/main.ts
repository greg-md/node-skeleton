import { NestFactory } from '@nestjs/core';
import { FastifyAdapter, NestFastifyApplication } from '@nestjs/platform-fastify';
import { MicroModule } from './micro.module';

async function bootstrap() {
  const app = await NestFactory.create<NestFastifyApplication>(
    MicroModule,
    new FastifyAdapter(),
  );
  await app.listen(3001, '0.0.0.0');
}
bootstrap();
