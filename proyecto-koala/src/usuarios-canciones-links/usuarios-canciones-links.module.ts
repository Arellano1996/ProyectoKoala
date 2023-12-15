import { Module } from '@nestjs/common';
import { UsuariosCancionesLinksService } from './usuarios-canciones-links.service';
import { UsuariosCancionesLinksController } from './usuarios-canciones-links.controller';

@Module({
  controllers: [UsuariosCancionesLinksController],
  providers: [UsuariosCancionesLinksService],
})
export class UsuariosCancionesLinksModule {}
