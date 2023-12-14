import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ServeStaticModule } from '@nestjs/serve-static';

import { join } from 'path';
import { UsuariosModule } from './usuarios/usuarios.module';
import { CancionesModule } from './canciones/canciones.module';

@Module({
  imports: [
    ServeStaticModule.forRoot({
      rootPath: join(__dirname, '..', 'public')
    }),
    ConfigModule.forRoot(),
    TypeOrmModule.forRoot({
      type: 'postgres',
      host: process.env.DB_HOST,
      port: +process.env.DB_PORT,
      database: process.env.DB_Name,
      username: process.env.DB_USERNAME,
      password: process.env.DB_PASSWORD,
      autoLoadEntities: true,
      synchronize: true//Solo en desarollo, sirve para cuando se crea o modifica la base de datos se actualize
      //En producción se suele hacer una migración
    }),
    UsuariosModule,
    CancionesModule
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
