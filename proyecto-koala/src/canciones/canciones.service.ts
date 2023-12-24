import { ConflictException, Injectable, InternalServerErrorException, Logger, NotFoundException } from '@nestjs/common';
import { CreateCancioneDto } from './dto/create-cancione.dto';
import { UpdateCancioneDto } from './dto/update-cancione.dto';
import { Cancion } from './entities/cancion.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { EntityNotFoundError, QueryBuilder, Repository } from 'typeorm';
import { Genero } from 'src/generos/entities/genero.entity';
import { Artista } from 'src/artistas/entities/artistas.entity';
import { CreateGeneroDto } from 'src/generos/dto/create-genero.dto';
import { createOrGetExistingEntities } from 'src/common/resultados.existentes';
import { CreateArtistaDto } from 'src/artistas/dto/create-artista.dto';
import { PaginationDto } from 'src/common/paginacion.dto';
import { validate as isUUID } from 'uuid';

@Injectable()
export class CancionesService {

  private readonly logger = new Logger('Canciones Service');

  constructor(
    @InjectRepository(Cancion)
    private readonly repository: Repository<Cancion>,

    @InjectRepository(Genero)
    private readonly repositoryGenero: Repository<Genero>,

    @InjectRepository(Artista)
    private readonly repositoryArtista: Repository<Artista>,

  ) { }

  async create(createCancioneDto: CreateCancioneDto) {

    try {

      const { Generos, Artistas, ...restoPropiedades } = createCancioneDto;

      const generosExistentes = await createOrGetExistingEntities(
        this.repositoryGenero,//Se envia el repositorio
        Generos.map(genero => ({ ...genero } as CreateGeneroDto)),//Se manda uno por uno el objeto tipo DTO; *Se usa operador de propagación
        genero => ({ Nombre: genero.Nombre }),//Criterio por el cuál se va a comprar si hay otro resultado con el mismo valor, en este caso si hay otro resultado con el mismo nomnbre
        'genero'//Nombre de la tabla
      );//Si en la base de datos ya existe un genero con el mismo nombre trae esa referencia, de lo contrario crea el nuevo dato

      const artistasExistentes = await createOrGetExistingEntities(
        this.repositoryArtista,
        Artistas.map(artista => ({ ...artista } as CreateArtistaDto)),
        artista => ({ Nombre: artista.Nombre }),
        'artista'//Nombre de la tabla
      );

      const cancion = this.repository.create({
        ...restoPropiedades,
        Generos: generosExistentes,
        Artistas: artistasExistentes
      })

      await this.repository.save(cancion)

      return cancion;


    } catch (error) {
      this.logger.error(error);
      if (error.code === '23505') throw new ConflictException(`La canción con el nombre: ${createCancioneDto.Nombre}, ya existe`)
      throw new InternalServerErrorException()
    }
  }

  async findAll(paginationDto: PaginationDto) {
    try {

      const { limite = 10, skip = 0 } = paginationDto;

      return await this.repository.find({
        take: limite,
        skip: skip,
        relations: {
          Generos: true,
          Artistas: true
        }
      })
    } catch (error) { }
  }

  async findOne(termino: string) {
    try {
      let cancion: Cancion;

      if (isUUID(termino)) {
        cancion = await this.repository.findOneOrFail({
          where: { CancionId: termino },
          relations: {
            Artistas: true,
            Generos: true
          }
        });
      } else {
        const queryBuilder = this.repository.createQueryBuilder('cancion')

        cancion = await queryBuilder.leftJoinAndSelect('cancion.Artistas', 'artistas')//alias de las entidades
        .where('cancion.Slug = :cancionslug or artistas.Slug = :artistanombre', { 
          cancionslug: termino, 
          artistanombre: termino 
        })
        //Haces la referencia a las entidades y despues a sus propiedades
        .getOneOrFail()

        // canciones = await queryBuilder.leftJoinAndSelect('cancion.Artistas', 'Nombre').getMany()
      }


      return cancion

    } catch (error) {
      this.logger.error(error);
      if (error instanceof EntityNotFoundError) {
        // Lanzar una excepción específica si la canción no se encuentra
        throw new NotFoundException(`La canción solicitada no existe.`);
      }
      throw new InternalServerErrorException()
    }

  }

  update(id: string, updateCancioneDto: UpdateCancioneDto) {
    return `This action updates a #${id} cancione`;
  }

  async remove(cancionid: string) {
    try {

      const cancion = await this.repository.findOneByOrFail({ CancionId: cancionid });
      // const cancion = await this.repository.findOne({ 
      //   relations: {
      //     Artistas: true,
      //     Generos: true
      //   },
      //   where: {
      //     CancionId
      //   }
      //  });
      console.log(cancion)

      await this.repository.remove(cancion)

      const { CancionId, ...resto } = cancion;
      return resto;

    } catch (error) {
      this.logger.error(error);
      if (error instanceof EntityNotFoundError) {
        // Lanzar una excepción específica si la canción no se encuentra
        throw new NotFoundException(`La canción solicitada no existe.`);
      }
      throw new InternalServerErrorException()
    }
  }
}
