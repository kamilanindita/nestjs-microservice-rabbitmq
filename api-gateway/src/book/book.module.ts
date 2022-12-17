import { Module } from '@nestjs/common';
import { BookController } from './book.controller';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { ClientProxyFactory, Transport } from '@nestjs/microservices';

@Module({
  imports: [ConfigModule.forRoot()],
  providers: [
    {
      provide: 'BOOK_SERVICE',
      inject: [ConfigService],
      useFactory: (configService: ConfigService) =>
        ClientProxyFactory.create({
          transport: Transport.RMQ,
          options:{
            urls: configService.get<any>('URLS_BROKER'),
            queue: 'books_queue',
            noAck: false,
            queueOptions: {
              durable: true
            },
          }
        }),
    },
  ],
  controllers: [BookController]
})
export class BookModule {}
