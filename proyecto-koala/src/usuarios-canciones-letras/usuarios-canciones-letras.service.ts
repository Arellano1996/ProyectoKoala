import { Injectable } from '@nestjs/common';
import { CreateUsuariosCancionesLetraDto } from './dto/create-usuarios-canciones-letra.dto';
import { UpdateUsuariosCancionesLetraDto } from './dto/update-usuarios-canciones-letra.dto';

@Injectable()
export class UsuariosCancionesLetrasService {
  create(createUsuariosCancionesLetraDto: CreateUsuariosCancionesLetraDto) {
    return 'This action adds a new usuariosCancionesLetra';
  }

  findAll() {
    return `This action returns all usuariosCancionesLetras`;
  }

  findOne(id: number) {
    return `This action returns a #${id} usuariosCancionesLetra`;
  }

  update(id: number, updateUsuariosCancionesLetraDto: UpdateUsuariosCancionesLetraDto) {
    return `This action updates a #${id} usuariosCancionesLetra`;
  }

  remove(id: number) {
    return `This action removes a #${id} usuariosCancionesLetra`;
  }
}
