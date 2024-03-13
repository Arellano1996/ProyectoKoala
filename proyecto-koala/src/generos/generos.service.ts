//#region imports
import { Injectable, Logger } from '@nestjs/common';
import { CreateGeneroDto } from './dto/create-genero.dto';
import { UpdateGeneroDto } from './dto/update-genero.dto';
import { Genero } from './entities/genero.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { QueryBuilder, Repository } from 'typeorm';
import erroresHandler from 'src/common/errores.handler';
import { PaginationDto } from 'src/common/paginacion.dto';
import { GenerosConPaginacion } from 'src/common/consultas/GenerosConPaginacion';
import { isUUID } from 'class-validator';
import { formatearSlug } from 'src/common/formatear-slug';
import { GenerosPorUUIDoTermino } from 'src/common/consultas/GenerosPorUUIDoTermino';
import { Artista } from 'src/artistas/entities/artistas.entity';
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

      await this.repository.save(genero)

      return createGeneroDto
      
    } catch (error) {
      this.handleExceptions(error, `El genero: ${createGeneroDto.Nombre}, ya existe`)
    }
  }

  async findAll(paginationDto: PaginationDto) {
    try {
      
      const { limite = 0, skip = 0 } = paginationDto

      return await GenerosConPaginacion(limite, skip)

    } catch (error) {
      this.handleExceptions(error)
    }
  }

  async findByTerm(termino: string) {
    try {
      //Cuando se busca por termino, se puede usar el UUID, o un termino, en el primer caso se trae el resultado único y en el segundo se trae todas las coincidencias
      let genero: Genero | [Genero[], number]

      genero = await GenerosPorUUIDoTermino( termino )

      return genero

    } catch (error) {
      this.handleExceptions(error)
    }
  }

  async update(generoId: string, updateGeneroDto: UpdateGeneroDto) {
    try {

      if(generoId != updateGeneroDto.GeneroId) this.handleExceptions(null, 'Información invalida')

      const genero = await this.repository.preload({
        ...updateGeneroDto
      })

      await this.repository.save(genero)

      return await this.repository.findOneBy({ GeneroId: generoId })

    } catch (error) {
      this.handleExceptions(error, `El genero con el nombre: ${updateGeneroDto.Nombre}, ya existe`)
    }
  }

  async remove(generoId: string) {
    try {
      
      const genero = await this.repository.findOneByOrFail({ GeneroId: generoId })

      const _genero = await this.repository.createQueryBuilder('genero')
      .where('genero.GeneroId = :generoId', { generoId })
      .select([
        'genero.Nombre'
      ])
      .getOne()

      await this.repository.remove(genero)

      return _genero

    } catch (error) {
      this.handleExceptions(error, `El genero que se intenta borrar no existe.`);
    }
  }
}
