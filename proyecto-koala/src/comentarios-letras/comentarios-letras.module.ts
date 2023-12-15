import { Module } from '@nestjs/common';
import { ComentariosLetrasService } from './comentarios-letras.service';
import { ComentariosLetrasController } from './comentarios-letras.controller';

@Module({
  controllers: [ComentariosLetrasController],
  providers: [ComentariosLetrasService],
})
export class ComentariosLetrasModule {}
