import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { CustomerModule } from './customer/customer.module';

@Module({
  imports: [ConfigModule.forRoot({ isGlobal: true }), CustomerModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
