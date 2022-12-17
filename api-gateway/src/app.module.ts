import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { BookModule } from './book/book.module';
import { CustomerModule } from './customer/customer.module';

@Module({
  imports: [BookModule, CustomerModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
