import { Module } from '@nestjs/common';
import { CustomerController } from './customer.controller';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { ClientProxyFactory, Transport } from '@nestjs/microservices';

@Module({
  imports: [ConfigModule.forRoot()],
  providers: [
    {
      provide: 'CUSTOMER_SERVICE',
      inject: [ConfigService],
      useFactory: (configService: ConfigService) =>
        ClientProxyFactory.create({
          transport: Transport.RMQ,
          options:{
            urls: configService.get<any>('URLS_BROKER'),
            queue: 'customers_queue',
            noAck: false,
            queueOptions: {
              durable: true
            },
          }
        }),
    },
  ],
  controllers: [CustomerController],
})
export class CustomerModule {}
