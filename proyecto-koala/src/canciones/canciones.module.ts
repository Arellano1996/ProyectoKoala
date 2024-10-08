import { Module } from '@nestjs/common';
import { CancionesService } from './canciones.service';
import { CancionesController } from './canciones.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Cancion } from './entities/cancion.entity';
import { Genero } from 'src/generos/entities/genero.entity';
import { Artista } from 'src/artistas/entities/artistas.entity';
import { UsuariosModule } from 'src/usuarios/usuarios.module';
import { Link } from 'src/link/entities/link.entity';
import { LinkModule } from 'src/link/link.module';
import { Usuario } from 'src/usuarios/entities/usuario.entity';
import { Letra } from 'src/letras/entities/letra.entity';
import { ComentariosLetra } from 'src/comentarios-letras/entities/comentarios-letra.entity';
import { ConfiguracionesLetra } from 'src/configuraciones-letras/entities/configuraciones-letra.entity';
import { validarSiExisteCancionConstraint } from './validations/validarSiExisteCancionConstraint';
import { Bateria } from 'src/baterias/entities/bateria.entity';

@Module({
  controllers: [CancionesController],
  providers: [CancionesService, validarSiExisteCancionConstraint],
  imports: [
    TypeOrmModule.forFeature([ 
      Cancion, 
      Genero, 
      Artista,
      Link,
      Usuario,
      Letra,
      ComentariosLetra,
      ConfiguracionesLetra,
      Bateria
     ]),
     UsuariosModule,
     LinkModule
  ],
})
export class CancionesModule {}
