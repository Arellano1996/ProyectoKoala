import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationPipe } from '@nestjs/common';
import { useContainer } from 'class-validator';
import * as cors from 'cors';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  app.useGlobalPipes(
    new ValidationPipe({
      whitelist: true,
      forbidNonWhitelisted: true,
    })
  )

  app.use(cors({
    // origin: 'http://localhost:4200', // Reemplaza con el origen de tu aplicación Angular
    origin: 'http://192.168.100.221:4200', // Reemplaza con el origen de tu aplicación Angular
    methods: 'GET,HEAD,PUT,PATCH,POST,DELETE',
    credentials: true,
  }));

  app.setGlobalPrefix('api')

  await app.listen(3000);
}

bootstrap();
