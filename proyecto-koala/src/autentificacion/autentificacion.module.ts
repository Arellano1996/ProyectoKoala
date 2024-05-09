import { Module } from '@nestjs/common';
import { AutentificacionService } from './autentificacion.service';
import { AutentificacionController } from './autentificacion.controller';

@Module({
  controllers: [AutentificacionController],
  providers: [AutentificacionService],
})
export class AutentificacionModule {}
