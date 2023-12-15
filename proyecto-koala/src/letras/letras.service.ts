import { Injectable } from '@nestjs/common';
import { CreateLetraDto } from './dto/create-letra.dto';
import { UpdateLetraDto } from './dto/update-letra.dto';

@Injectable()
export class LetrasService {
  create(createLetraDto: CreateLetraDto) {
    return 'This action adds a new letra';
  }

  findAll() {
    return `This action returns all letras`;
  }

  findOne(id: number) {
    return `This action returns a #${id} letra`;
  }

  update(id: number, updateLetraDto: UpdateLetraDto) {
    return `This action updates a #${id} letra`;
  }

  remove(id: number) {
    return `This action removes a #${id} letra`;
  }
}
