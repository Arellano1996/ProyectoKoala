import { Injectable } from '@nestjs/common';
import { CreateConfiguracionesLetraDto } from './dto/create-configuraciones-letra.dto';
import { UpdateConfiguracionesLetraDto } from './dto/update-configuraciones-letra.dto';

@Injectable()
export class ConfiguracionesLetrasService {
  create(createConfiguracionesLetraDto: CreateConfiguracionesLetraDto) {
    return 'This action adds a new configuracionesLetra';
  }

  findAll() {
    return `This action returns all configuracionesLetras`;
  }

  findOne(id: number) {
    return `This action returns a #${id} configuracionesLetra`;
  }

  update(id: number, updateConfiguracionesLetraDto: UpdateConfiguracionesLetraDto) {
    return `This action updates a #${id} configuracionesLetra`;
  }

  remove(id: number) {
    return `This action removes a #${id} configuracionesLetra`;
  }
}
