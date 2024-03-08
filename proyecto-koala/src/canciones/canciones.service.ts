//#region Importaciones 
import { BadRequestException, ConflictException, ConsoleLogger, Injectable, InternalServerErrorException, Logger, NotFoundException } from '@nestjs/common';
import { CreateCancioneDto } from './dto/create-cancione.dto';
import { UpdateCancioneDto } from './dto/update-cancione.dto';
import { Cancion } from './entities/cancion.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Genero } from 'src/generos/entities/genero.entity';
import { Artista } from 'src/artistas/entities/artistas.entity';
import { CreateGeneroDto } from 'src/generos/dto/create-genero.dto';
import { createOrGetExistingEntities } from 'src/common/resultados.existentes';
import { CreateArtistaDto } from 'src/artistas/dto/create-artista.dto';
import { PaginationDto } from 'src/common/paginacion.dto';
import { validate as isUUID } from 'uuid';
import { formatearSlug } from 'src/common/formatear-slug';
import '../common/extenciones/array.extensiones';
import erroresHandler from 'src/common/errores.handler';
import { CancionesPorArtistasIds } from '../common/consultas/CancionesPorArtistasIds';
import { Repository } from 'typeorm';
//#endregion Importaciones

@Injectable()
export class CancionesService extends erroresHandler {

  constructor(
    @InjectRepository(Cancion)
    private readonly repository: Repository<Cancion>,

    @InjectRepository(Genero)
    private readonly repositoryGenero: Repository<Genero>,

    @InjectRepository(Artista)
    private readonly repositoryArtista: Repository<Artista>,

  ) { 
    super()
    this.logger = new Logger('Canciones Service')
  }

  async create(createCancioneDto: CreateCancioneDto) {
    try {

      const { Generos, Artistas, ...restoPropiedades } = createCancioneDto;

      //Revisar si ya existen los generos
      //Si ya existe se regresa la entidad existente, si no se regresa un repository create
      const generosExistentes = await createOrGetExistingEntities(
        this.repositoryGenero,//Se envia el repositorio
        Generos.map(genero => ({ ...genero } as CreateGeneroDto)),//Se manda uno por uno el objeto tipo DTO; *Se usa operador de propagación
        genero => ({ Nombre: genero.Nombre }),//Criterio por el cuál se va a comprar si hay otro resultado con el mismo valor, en este caso si hay otro resultado con el mismo nomnbre
        'genero'//Nombre de la tabla
      );//Si en la base de datos ya existe un genero con el mismo nombre trae esa referencia, de lo contrario crea el nuevo dato

      //Revisamos si los artistas ya existen
      const artistasExistentes = await createOrGetExistingEntities(
        this.repositoryArtista,
        Artistas.map(artista => ({ ...artista } as CreateArtistaDto)),
        artista => ({ Nombre: artista.Nombre }),
        'artista'//Nombre de la tabla
      )

      const cancionesPorArtistasIds = (await CancionesPorArtistasIds(artistasExistentes, createCancioneDto, this.repository)).forEach(resultado => {
         if (resultado.status === 'rejected') throw new ConflictException(resultado.reason);
       })

      const cancion = this.repository.create({
        ...restoPropiedades,
        Generos: generosExistentes,
        Artistas: artistasExistentes
      })

      await this.repository.save(cancion)
      
      const _cancion = this.repository.create({
        ...restoPropiedades,
        Generos,
        Artistas
      })
      
      return _cancion;

    } catch (error) {
      this.handleExceptions(error, `La canción con el nombre: ${createCancioneDto.Nombre}, ya existe`)
    }
  }

  async findAll(paginationDto: PaginationDto) {
    try {

      const { limite = 10, skip = 0 } = paginationDto;

      return await this.repository.find({
        take: limite,
        skip: skip,
        select: {
          // Creador: true,
          // Nombre: true
        },
        relations: {
          Generos: true,
          Artistas: true
        }
      })

    } catch (error) { 
      this.handleExceptions(error)
    }
  }

  async findByTerm(termino: string) {
    try {

      let cancion: Cancion | [Cancion[], number];

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

        cancion = await queryBuilder
        .leftJoinAndSelect('cancion.Artistas', 'artistas')//alias de las entidades
        .leftJoinAndSelect('cancion.Generos', 'generos')
        .where('cancion.Slug LIKE :cancionslug or artistas.Slug LIKE :artistanombre', { 
          cancionslug: `%${formatearSlug(termino)}%`, 
          artistanombre: `%${formatearSlug(termino)}%`
        })
        //Haces la referencia a las entidades y despues a sus propiedades
        .getManyAndCount()

      }
      return cancion

    } catch (error) {
      this.handleExceptions(error)
    }

  }

  async update(id: string, updateCancioneDto: UpdateCancioneDto) {
    try {
      //Lo que se debe tomar en cuenta al momento de editar una canción, deber ser lo mismo que cuando se crea
      //Si se cambia el nombre, este nuevo nombre no debe haber sido registrado con el mismo artista, y viseversa, se se cambia el artista
      //el artista no debe tener una canción con el nombre de la canción

      //Comprobamos que el id que se va editar, es el mismo que el id que recibimos
      if(id != updateCancioneDto.CancionId) this.handleExceptions(null, 'Información invalida')
      
      //Después vemos qué recibimos en nuestro objeto canción
      const { Artistas, Generos, ...resto } = updateCancioneDto;

      let artistasExistentes, generosExistentes;

      //Si recibimos Artistas revisar si ya existen o son nuevos artistas
      //Así obtener la referencia del objeto que ya existe o el nuevo objeto repository create
      if( Artista && Artistas.any() ){
        artistasExistentes = await createOrGetExistingEntities(
          this.repositoryArtista,
          Artistas.map(artista => ({ ...artista } as CreateArtistaDto)),
          artista => ({ Nombre: artista.Nombre }),
          'artista'//Nombre de la tabla
        );
      }

      //Si se recibió un artista que ya existe corroboramos que no tenga una canción con el mismo nombre
      

      if( Generos && Generos.any() ){
        generosExistentes = await createOrGetExistingEntities(
          this.repositoryGenero,//Se envia el repositorio
          Generos.map(genero => ({ ...genero } as CreateGeneroDto)),//Se manda uno por uno el objeto tipo DTO; *Se usa operador de propagación
          genero => ({ Nombre: genero.Nombre }),//Criterio por el cuál se va a comprar si hay otro resultado con el mismo valor, en este caso si hay otro resultado con el mismo nomnbre
          'genero'//Nombre de la tabla
        );//Si en la base de datos ya existe un genero con el mismo nombre trae esa referencia, de lo contrario crea el nuevo dato
      }

      const cancion = await this.repository.preload({
        CancionId: id,
        Artistas: artistasExistentes,
        Generos: generosExistentes,
        ...resto
      })
      
      await this.repository.save(cancion)

      return await this.repository.findOne({
        where: { CancionId: id },
        relations: {
          Generos: true,
          Artistas: true
        }
      })
      } catch (error) {
        console.log(error)
        this.handleExceptions(error)
      }
  
  }

  async remove(cancionid: string) {
    try {
      //Para eliminar se necesita una instancia de la canción
      const cancion = await this.repository.findOneByOrFail({ CancionId: cancionid });

      //Esta canción solo tiene la información necesaria para el usuario
      const _cancion = await this.repository.createQueryBuilder('cancion')
      .leftJoinAndSelect('cancion.Artistas', 'artistas')
      .where('cancion.CancionId = :cancionid', { cancionid })
      .select([
        'cancion.Nombre',
        'artistas.Nombre'
      ])
      .getOne();
      
      //Eliminamos la intancia de la canción
      await this.repository.remove(cancion)

      //Y mostramos la información relevante de la canción al usuario
      return _cancion

    } catch (error) {
      this.handleExceptions(error, `La canción que se intenta borrar no existe.`)
    }
  }
}
