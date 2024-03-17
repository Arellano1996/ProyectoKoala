//#region imports
import { Module } from '@nestjs/common';
import { UsuariosService } from './usuarios.service';
import { UsuariosController } from './usuarios.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Usuario } from './entities/usuario.entity';
import { Cancion } from 'src/canciones/entities/cancion.entity';
//#endregion imports

@Module({
  controllers: [UsuariosController],
  providers: [UsuariosService],
  imports: [
    TypeOrmModule.forFeature([ 
      Usuario,
      Cancion
     ])
  ],
})
export class UsuariosModule {}
