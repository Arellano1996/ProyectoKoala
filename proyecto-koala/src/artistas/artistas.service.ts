//#region Import
import { Injectable, Logger } from '@nestjs/common';
import { CreateArtistaDto } from './dto/create-artista.dto';
import { UpdateArtistaDto } from './dto/update-artista.dto';
import { Artista } from './entities/artistas.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import erroresHandler from 'src/common/errores.handler';
import { ArtistasConPaginacion } from 'src/common/consultas/ArtistasConPaginacion';
import { PaginationDto } from 'src/common/paginacion.dto';
import { ArtistasPorUUIDoTermino } from 'src/common/consultas/ArtistasPorUUIDoTermino';
//#endregion import

@Injectable()
export class ArtistasService extends erroresHandler
{
  constructor(@InjectRepository(Artista) private readonly repository: Repository<Artista>,) { 
    super()
    this.logger = new Logger('Artistas Service')
  }
    
  async create(createArtistaDto: CreateArtistaDto) {
    try 
    {
      const artista = this.repository.create(createArtistaDto)
        
      await this.repository.save(artista)

      return createArtistaDto
    } 
    catch (error) 
    {
      this.handleExceptions(error, `El artista con el nombre: ${createArtistaDto.Nombre}, ya existe`)
    }
  }

  async findAll(paginationDto: PaginationDto) {
    try {

      const { limite = 0, skip = 0 } = paginationDto;

      return await ArtistasConPaginacion(limite, skip)

    } catch (error) {
      this.handleExceptions(error)
    }
  }

  async findByTerm(termino: string) {
    try {
      //Cuando se busca por termino, se puede usar el UUID, o un termino, en el primer caso se trae el resultado único y en el segundo se trae todas las coincidencias
      let artista: Artista | [Artista[], number]

      artista = await ArtistasPorUUIDoTermino(termino)
      
      return artista

    } catch (error) {
      this.handleExceptions(error)
    }
  }

  async update(artistaId: string, updateArtistaDto: UpdateArtistaDto) {
    try {
      //Primero vemos que el body y el uuid sean iguales
      if(artistaId != updateArtistaDto.ArtistaId) this.handleExceptions(null, 'Información invalida')

      const artista = await this.repository.preload({
        ...updateArtistaDto
      })

      await this.repository.save(artista)

      return await this.repository.findOne({
        where: {
          ArtistaId: artistaId
        }
      })
    } catch (error) {
      this.handleExceptions(error, `El artista con el nombre: ${updateArtistaDto.Nombre}, ya existe`)
    }
  }

  async remove(artistaId: string) {
    try {

      const artista = await this.repository.findOneByOrFail({ ArtistaId: artistaId })

      const _artista = await this.repository.createQueryBuilder('artista')
      .where('artista.ArtistaId = :artistaId', { artistaId: artistaId })
      .select([
        'artista.Nombre'
      ])
      .getOne()
      
      await this.repository.remove(artista);

      return _artista

    } catch (error) {
      this.handleExceptions(error, `El artista que se intenta borrar no existe.`);
    }
  }
}
