import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { BookModule } from './book/book.module';

@Module({
  imports: [ConfigModule.forRoot({ isGlobal: true }), BookModule],
  controllers: [AppController],
  providers: [AppService]
})
export class AppModule {}
