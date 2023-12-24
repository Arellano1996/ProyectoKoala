import { ConflictException, Injectable, InternalServerErrorException, Logger } from '@nestjs/common';
import { CreateGeneroDto } from './dto/create-genero.dto';
import { UpdateGeneroDto } from './dto/update-genero.dto';
import { Genero } from './entities/genero.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { createOrGetExistingEntity } from 'src/common/resultados.existentes';

@Injectable()
export class GenerosService {

  private readonly logger = new Logger('Generos Service');

  constructor(
    @InjectRepository(Genero)
    private readonly repository: Repository<Genero>,
  ){}

  async create(createGeneroDto: CreateGeneroDto) {
    try {

      const genero = this.repository.create(createGeneroDto)

      await this.repository.save(genero);

      return genero;
      
    } catch (error) {
      this.logger.error(error);
      if (error.code === '23505') throw new ConflictException(`El genero: ${createGeneroDto.Nombre}, ya existe`)
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
