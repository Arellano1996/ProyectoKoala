import { Injectable } from '@nestjs/common';
import { CreateComentariosLetraDto } from './dto/create-comentarios-letra.dto';
import { UpdateComentariosLetraDto } from './dto/update-comentarios-letra.dto';

@Injectable()
export class ComentariosLetrasService {
  create(createComentariosLetraDto: CreateComentariosLetraDto) {
    return 'This action adds a new comentariosLetra';
  }

  findAll() {
    return `This action returns all comentariosLetras`;
  }

  findOne(id: number) {
    return `This action returns a #${id} comentariosLetra`;
  }

  update(id: number, updateComentariosLetraDto: UpdateComentariosLetraDto) {
    return `This action updates a #${id} comentariosLetra`;
  }

  remove(id: number) {
    return `This action removes a #${id} comentariosLetra`;
  }
}
