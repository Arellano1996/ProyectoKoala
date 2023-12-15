import { Injectable } from '@nestjs/common';
import { CreateUsuariosCancionesLinkDto } from './dto/create-usuarios-canciones-link.dto';
import { UpdateUsuariosCancionesLinkDto } from './dto/update-usuarios-canciones-link.dto';

@Injectable()
export class UsuariosCancionesLinksService {
  create(createUsuariosCancionesLinkDto: CreateUsuariosCancionesLinkDto) {
    return 'This action adds a new usuariosCancionesLink';
  }

  findAll() {
    return `This action returns all usuariosCancionesLinks`;
  }

  findOne(id: number) {
    return `This action returns a #${id} usuariosCancionesLink`;
  }

  update(id: number, updateUsuariosCancionesLinkDto: UpdateUsuariosCancionesLinkDto) {
    return `This action updates a #${id} usuariosCancionesLink`;
  }

  remove(id: number) {
    return `This action removes a #${id} usuariosCancionesLink`;
  }
}
