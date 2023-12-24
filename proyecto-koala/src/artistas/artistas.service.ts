import { ConflictException, Injectable, InternalServerErrorException, Logger, NotFoundException } from '@nestjs/common';
import { CreateArtistaDto } from './dto/create-artista.dto';
import { UpdateArtistaDto } from './dto/update-artista.dto';
import { Artista } from './entities/artistas.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { createOrGetExistingEntity } from 'src/common/resultados.existentes';

@Injectable()
export class ArtistasService {

  private readonly logger = new Logger('Artistas Service');

  constructor(
    @InjectRepository(Artista)
    private readonly repository: Repository<Artista>,
  ){}

  async create(createArtistaDto: CreateArtistaDto) {
    try {

      const cancion = this.repository.create(createArtistaDto)
      
      await this.repository.save(cancion)

      return cancion;

    } catch (error) {
      this.logger.error(error);
      if(error.code === '23505') throw new ConflictException(`El artista con el nombre: ${createArtistaDto.Nombre}, ya existe`)
      throw new InternalServerErrorException(`No se encontró un artista con el nombre: ${createArtistaDto.Nombre}`)
    }
  }

  findAll() {
    try {
      return this.repository.find();
    } catch (error) {
      throw new InternalServerErrorException()
    }
  }

  async findOne(ArtistaId: string) {
    try {

      const artista = await this.repository.findOneBy({ ArtistaId })
      
      if(!artista) throw new NotFoundException(`El artista con el id: ${ ArtistaId } no existe`);

      return artista;

    } catch (error) {
      throw new InternalServerErrorException()
    }
  }

  update(id: number, updateArtistaDto: UpdateArtistaDto) {
    return `This action updates a #${id} artista`;
  }

  async remove(ArtistaId: string) {
    try {

      const artista = await this.repository.findOneBy({ ArtistaId });
      
      await this.repository.remove(artista);

    } catch (error) {
      throw new InternalServerErrorException()
    }
  }
}
