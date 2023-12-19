import { Module } from '@nestjs/common';
import { CancionesService } from './canciones.service';
import { CancionesController } from './canciones.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Cancion } from './entities/cancion.entity';
import { Genero } from 'src/generos/entities/genero.entity';
import { Artista } from 'src/artistas/entities/artistas.entity';

@Module({
  controllers: [CancionesController],
  providers: [CancionesService],
  imports: [
    TypeOrmModule.forFeature([ 
      Cancion, 
      Genero, 
      Artista ])
  ],
})
export class CancionesModule {}
