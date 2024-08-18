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

  const allowedOrigins = [
    'http://proyecto-koala.com',
    'http://localhost',
    'http://192.168.100.221',
    'http://192.168.1.10',
    // Agrega aquí otros dominios permitidos
  ];

  app.use(
    cors(
      {
        origin: (origin, callback) => {
          if (allowedOrigins.includes(origin) || !origin) {
            // Permitir el origen o permitir solicitudes sin origen (para requests no desde navegador)
            callback(null, true);
          } else {
            // Rechazar orígenes no permitidos
            callback(new Error('Not allowed by CORS'));
          }
        },
        methods: 'GET,HEAD,PUT,PATCH,POST,DELETE',
        credentials: true,
      }
    )
);

  app.setGlobalPrefix('api')

  await app.listen(3000);
}

bootstrap();
