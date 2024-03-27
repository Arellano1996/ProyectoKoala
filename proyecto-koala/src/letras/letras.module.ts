import { Module } from '@nestjs/common';
import { LetrasService } from './letras.service';
import { LetrasController } from './letras.controller';
import { Letra } from './entities/letra.entity';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Usuario } from 'src/usuarios/entities/usuario.entity';
import { Cancion } from 'src/canciones/entities/cancion.entity';
import { ComentariosLetra } from 'src/comentarios-letras/entities/comentarios-letra.entity';
import { ConfiguracionesLetra } from 'src/configuraciones-letras/entities/configuraciones-letra.entity';

@Module({
  controllers: [LetrasController],
  providers: [LetrasService],
  imports:[
    TypeOrmModule.forFeature([
      Letra,
      Usuario,
      Cancion,
      ComentariosLetra,
      ConfiguracionesLetra
    ])
  ]
})
export class LetrasModule {}
