import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationPipe } from '@nestjs/common';
import 'dotenv/config';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  console.log(process.env.MONGO_URI);

  app.useGlobalPipes(new ValidationPipe());

  await app.listen(3000);
}
bootstrap();
