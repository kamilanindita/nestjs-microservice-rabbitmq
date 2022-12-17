import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { MicroserviceOptions, Transport } from '@nestjs/microservices';
import { ConfigService } from '@nestjs/config';
import { Logger } from '@nestjs/common';

async function bootstrap() {
  const app = await NestFactory.create(AppModule,{
    logger: new Logger,
  })
  const configService = app.get<ConfigService>(ConfigService)
  app.connectMicroservice<MicroserviceOptions>({
    transport: Transport.RMQ,
    options: {
      urls: configService.get<any>('URLS_BROKER'),
      queue: 'customers_queue',
      noAck: false,
      queueOptions: {
        durable: true
      },

    }
  })

  app.startAllMicroservices()
}
bootstrap();

