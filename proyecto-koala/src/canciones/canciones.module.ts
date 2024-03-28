import { Module } from '@nestjs/common';
import { CancionesService } from './canciones.service';
import { CancionesController } from './canciones.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Cancion } from './entities/cancion.entity';
import { Genero } from 'src/generos/entities/genero.entity';
import { Artista } from 'src/artistas/entities/artistas.entity';
import { UsuariosService } from 'src/usuarios/usuarios.service';
import { UsuariosModule } from 'src/usuarios/usuarios.module';
import { Link } from 'src/link/entities/link.entity';
import { LinkModule } from 'src/link/link.module';
import { Usuario } from 'src/usuarios/entities/usuario.entity';
import { Letra } from 'src/letras/entities/letra.entity';
import { ComentariosLetra } from 'src/comentarios-letras/entities/comentarios-letra.entity';

@Module({
  controllers: [CancionesController],
  providers: [CancionesService],
  imports: [
    TypeOrmModule.forFeature([ 
      Cancion, 
      Genero, 
      Artista,
      Link,
      Usuario,
      Letra,
      ComentariosLetra
     ]),
     UsuariosModule,
     LinkModule
  ],
})
export class CancionesModule {}
