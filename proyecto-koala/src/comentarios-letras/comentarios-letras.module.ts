import { Module } from '@nestjs/common';
import { ComentariosLetrasService } from './comentarios-letras.service';
import { ComentariosLetrasController } from './comentarios-letras.controller';
import { ComentariosLetra } from './entities/comentarios-letra.entity';
import { TypeOrmModule } from '@nestjs/typeorm';

@Module({
  controllers: [ComentariosLetrasController],
  providers: [ComentariosLetrasService],
  imports: [
    TypeOrmModule.forFeature([
      ComentariosLetra
    ])
  ]

  
})
export class ComentariosLetrasModule {}
