//#region Importaciones 
import { BadRequestException, ConflictException, ConsoleLogger, Injectable, InternalServerErrorException, Logger, NotFoundException } from '@nestjs/common';
import { CreateCancioneDto } from './dto/create-cancione.dto';
import { UpdateCancioneDto } from './dto/update-cancione.dto';
import { Cancion } from './entities/cancion.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { EntityNotFoundError, Repository } from 'typeorm';
import { Genero } from 'src/generos/entities/genero.entity';
import { Artista } from 'src/artistas/entities/artistas.entity';
import { CreateGeneroDto } from 'src/generos/dto/create-genero.dto';
import { createOrGetExistingEntities } from 'src/common/resultados.existentes';
import { CreateArtistaDto } from 'src/artistas/dto/create-artista.dto';
import { PaginationDto } from 'src/common/paginacion.dto';
import { validate as isUUID } from 'uuid';
import { formatearSlug } from 'src/common/formatear-slug';
import '../common/extenciones/array.extensiones';
//#endregion Importaciones

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

      //Revisar si ya existen los generos
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

      //Aquí se revisa si la canción ya fue registrada con un artista existente
      const yaExiste = await Promise.allSettled( artistasExistentes.map( async (artista) => {//Se recorren los artistas
        
        const { ArtistaId } = {...artista} as Artista;//Si tienen la propiedad ArtistaId significa que ese artista ya está registrado, por lo tanto hay que corroborar si
                                                      //ya tiene una canción registrada con el mismo nombre
        if(ArtistaId){//Si este valor (ArtistaId) existe significa que el artista ya está registrado

          const yaHayUnaCancionConElMismoNombreYArtista = 
          await this.repository.createQueryBuilder('cancion')
          .leftJoinAndSelect('cancion.Artistas', 'artistas')//alias de las entidades
          .leftJoinAndSelect('cancion.Generos', 'generos')
          .where('cancion.Slug = :cancionslug and artistas.Slug = :artistanombre', {
            cancionslug: formatearSlug(restoPropiedades.Nombre), 
            artistanombre: formatearSlug(artista.Nombre) 
          }).getOne();

          if(yaHayUnaCancionConElMismoNombreYArtista) throw new ConflictException(`El artista ${ artista.Nombre } ya tiene una canción con el nombre: ${createCancioneDto.Nombre}.`)
        }
      }) )

      //Revisamos si hubo exceptions
      yaExiste.forEach( resultado => {
        if (resultado.status === 'rejected') throw new ConflictException(resultado.reason)
      })
      
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
      if(error instanceof ConflictException) throw new ConflictException(error.message)
      throw new InternalServerErrorException()
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

    } catch (error) { }
  }

  async findByTerm(termino: string) {
    try {

      let cancion: Cancion | Cancion[];

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
        .getMany()

        if(!cancion.any()) throw new NotFoundException();
      }
      return cancion

    } catch (error) {
      this.logger.error(error);
      if (error instanceof EntityNotFoundError) {
        // Lanzar una excepción específica si la canción no se encuentra
        throw new NotFoundException(`La canción solicitada no existe.`);
      }
      if(error instanceof NotFoundException){
        throw new NotFoundException(`No se encontraron elementos.`);
      }
      throw new InternalServerErrorException()
    }

  }

  async update(id: string, updateCancioneDto: UpdateCancioneDto) {
    
    if(id != updateCancioneDto.CancionId) throw new BadRequestException('Datos invalidos')

    const { Artistas, Generos, ...resto } = updateCancioneDto;

    let artistasExistentes, generosExistentes;

    if(Artistas){
      artistasExistentes = await createOrGetExistingEntities(
        this.repositoryArtista,
        Artistas.map(artista => ({ ...artista } as CreateArtistaDto)),
        artista => ({ Nombre: artista.Nombre }),
        'artista'//Nombre de la tabla
      );

    }

    if(Generos){
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
  }

  async remove(cancionid: string) {
    try {

      const cancion = await this.repository.findOneByOrFail({ CancionId: cancionid });
     
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
