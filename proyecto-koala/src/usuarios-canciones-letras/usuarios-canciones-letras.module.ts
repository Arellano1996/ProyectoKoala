import { Module } from '@nestjs/common';
import { UsuariosCancionesLetrasService } from './usuarios-canciones-letras.service';
import { UsuariosCancionesLetrasController } from './usuarios-canciones-letras.controller';

@Module({
  controllers: [UsuariosCancionesLetrasController],
  providers: [UsuariosCancionesLetrasService],
})
export class UsuariosCancionesLetrasModule {}
