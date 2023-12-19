import { Injectable, InternalServerErrorException } from '@nestjs/common';
import { CreateGeneroDto } from './dto/create-genero.dto';
import { UpdateGeneroDto } from './dto/update-genero.dto';
import { Genero } from './entities/genero.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { createOrGetExistingEntity } from 'src/Helper/resultados.existentes';

@Injectable()
export class GenerosService {

  constructor(
    @InjectRepository(Genero)
    private readonly repository: Repository<Genero>,
  ){}

  async create(createGeneroDto: CreateGeneroDto) {
    try {

      const generoExiste = await createOrGetExistingEntity(
        this.repository,
        createGeneroDto,
        { Nombre: createGeneroDto.Nombre },
        'genero'
      );

      return generoExiste;
      
    } catch (error) {
      console.log(error);
      throw new InternalServerErrorException();
    }
  }

  findAll() {
    return `This action returns all generos`;
  }

  findOne(id: number) {
    return `This action returns a #${id} genero`;
  }

  update(id: number, updateGeneroDto: UpdateGeneroDto) {
    return `This action updates a #${id} genero`;
  }

  remove(id: number) {
    return `This action removes a #${id} genero`;
  }
}
