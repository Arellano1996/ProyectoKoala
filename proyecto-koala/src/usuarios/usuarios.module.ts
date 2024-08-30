import { Module } from '@nestjs/common';
import { UsuariosService } from './usuarios.service';
import { UsuariosController } from './usuarios.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Usuario } from './entities/usuario.entity';
import { Cancion } from 'src/canciones/entities/cancion.entity';
import { Link } from 'src/link/entities/link.entity';
import { ConfigModule } from '@nestjs/config';

@Module({
  controllers: [UsuariosController],
  exports: [UsuariosService],
  providers: [UsuariosService],
  imports: [
    ConfigModule,
    TypeOrmModule.forFeature([ 
      Usuario,
      Cancion,
      Link
     ])
  ],
})
export class UsuariosModule {}
