import { Module } from '@nestjs/common';
import { ArtistasService } from './artistas.service';
import { ArtistasController } from './artista.controller';
import { Artista } from './entities/artistas.entity';
import { TypeOrmModule } from '@nestjs/typeorm';

@Module({
  controllers: [ArtistasController],
  providers: [ArtistasService],
  imports: [
    TypeOrmModule.forFeature([ Artista ])
  ]
})
export class ArtistasModule {}
