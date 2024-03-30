import { Module } from '@nestjs/common';
import { ComentariosLetrasService } from './comentarios-letras.service';
import { ComentariosLetrasController } from './comentarios-letras.controller';
import { ComentariosLetra } from './entities/comentarios-letra.entity';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Letra } from 'src/letras/entities/letra.entity';

@Module({
  controllers: [ComentariosLetrasController],
  providers: [ComentariosLetrasService],
  imports: [
    TypeOrmModule.forFeature([
      ComentariosLetra,
      Letra
    ])
  ]

  
})
export class ComentariosLetrasModule {}
