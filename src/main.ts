import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationPipe } from '@nestjs/common';
import { OpenWAModule } from './open-wa/open-wa.module';
import { OpenWASession } from './open-wa/open-wa.service';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  app.useGlobalPipes(new ValidationPipe());

  await app.listen(3000);

  // const openWAModule = await NestFactory.createApplicationContext(OpenWAModule);
  // const openWASession = openWAModule.get(OpenWASession);

  // // Iniciar a sessão Open-WA
  // await openWASession.startSession();
}
bootstrap();
