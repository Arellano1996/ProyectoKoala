import { Injectable } from '@nestjs/common';
import { CreateBateriaDto } from './dto/create-bateria.dto';
import { UpdateBateriaDto } from './dto/update-bateria.dto';

@Injectable()
export class BateriasService {
  create(createBateriaDto: CreateBateriaDto) {
    return 'This action adds a new bateria';
  }

  findAll() {
    return `This action returns all baterias`;
  }

  findOne(id: number) {
    return `This action returns a #${id} bateria`;
  }

  update(id: number, updateBateriaDto: UpdateBateriaDto) {
    return `This action updates a #${id} bateria`;
  }

  remove(id: number) {
    return `This action removes a #${id} bateria`;
  }
}
