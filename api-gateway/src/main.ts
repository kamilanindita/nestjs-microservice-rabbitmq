import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import * as dotenv from 'dotenv';
dotenv.config()

async function bootstrap() {
  const port = Number(process.env.PORT);
  const app = await NestFactory.create(AppModule);
  await app.listen(port);
}
bootstrap();
