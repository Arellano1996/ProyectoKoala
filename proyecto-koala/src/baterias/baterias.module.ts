import { Module } from '@nestjs/common';
import { BateriasService } from './baterias.service';
import { BateriasController } from './baterias.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Bateria } from './entities/bateria.entity';
import { validarQueExisteCancion } from './validations/validarQueExisteCancion';
import { Usuario } from 'src/usuarios/entities/usuario.entity';
import { UsuariosModule } from 'src/usuarios/usuarios.module';

@Module({
  controllers: [BateriasController],
  providers: [BateriasService],
  imports:[
    TypeOrmModule.forFeature([ 
      Bateria,
      Usuario
     ]),
     UsuariosModule
  ],
})
export class BateriasModule {}
