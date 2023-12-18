import { Module } from '@nestjs/common';
import { CancionesService } from './canciones.service';
import { CancionesController } from './canciones.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Cancion } from './entities/cancion.entity';

@Module({
  controllers: [CancionesController],
  providers: [CancionesService],
  imports: [
    TypeOrmModule.forFeature([ Cancion ])
  ],
})
export class CancionesModule {}
