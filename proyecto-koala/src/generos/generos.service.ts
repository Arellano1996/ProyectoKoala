//#region imports
import { Injectable, Logger } from '@nestjs/common';
import { CreateGeneroDto } from './dto/create-genero.dto';
import { UpdateGeneroDto } from './dto/update-genero.dto';
import { Genero } from './entities/genero.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import erroresHandler from 'src/common/errores.handler';
//#endregion imports

@Injectable()
export class GenerosService extends erroresHandler
{

  constructor(
    @InjectRepository(Genero)
    private readonly repository: Repository<Genero>,
  ){
    super()
    this.logger = new Logger('Generos Service')
  }

  async create(createGeneroDto: CreateGeneroDto) {
    try {

      const genero = this.repository.create(createGeneroDto)

      await this.repository.save(genero);

      return genero;
      
    } catch (error) {
      this.handleExceptions(error, `El genero: ${createGeneroDto.Nombre}, ya existe`)
    }
  }

  findAll() {
    return `This action returns all generos`;
  }

  findByTerm(id: number) {
    return `This action returns a #${id} genero`;
  }

  update(id: number, updateGeneroDto: UpdateGeneroDto) {
    return `This action updates a #${id} genero`;
  }

  remove(id: number) {
    return `This action removes a #${id} genero`;
  }
}
