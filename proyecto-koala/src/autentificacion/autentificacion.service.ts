import { Injectable } from '@nestjs/common';
import { CreateAutentificacionDto } from './dto/create-autentificacion.dto';
import { UpdateAutentificacionDto } from './dto/update-autentificacion.dto';

@Injectable()
export class AutentificacionService {
  create(createAutentificacionDto: CreateAutentificacionDto) {
    return 'This action adds a new autentificacion';
  }

  findAll() {
    return `This action returns all autentificacion`;
  }

  findOne(id: number) {
    return `This action returns a #${id} autentificacion`;
  }

  update(id: number, updateAutentificacionDto: UpdateAutentificacionDto) {
    return `This action updates a #${id} autentificacion`;
  }

  remove(id: number) {
    return `This action removes a #${id} autentificacion`;
  }
}
