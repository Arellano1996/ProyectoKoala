import { ConflictException, Injectable, InternalServerErrorException, Logger, NotFoundException } from '@nestjs/common';
import { CreateCancioneDto } from './dto/create-cancione.dto';
import { UpdateCancioneDto } from './dto/update-cancione.dto';
import { Cancion } from './entities/cancion.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { EntityNotFoundError, Repository } from 'typeorm';
import { Genero } from 'src/generos/entities/genero.entity';
import { Artista } from 'src/artistas/entities/artistas.entity';
import { CreateGeneroDto } from 'src/generos/dto/create-genero.dto';
import { createOrGetExistingEntities } from 'src/Helper/resultados.existentes';
import { CreateArtistaDto } from 'src/artistas/dto/create-artista.dto';

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

  ){}

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
        Artistas.map(artista => ({ ... artista } as CreateArtistaDto )),
        artista => ({ Nombre: artista.Nombre}),
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
      if(error.code === '23505') throw new ConflictException(`La canción con el nombre: ${createCancioneDto.Nombre}, ya existe`)
      throw new InternalServerErrorException()
    }
  }

  async findAll() {
    try {
      return await this.repository.find({
        relations:{
          Generos: true,
          Artistas: true
        }
      })
    } catch (error) {}
  }

  findOne(id: number) {
    return `This action returns a #${id} cancione`;
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
      
      const {CancionId, ...resto} = cancion;
      return  resto;
      
    } catch (error) {
      this.logger.error({error});
      if (error instanceof EntityNotFoundError) {
        // Lanzar una excepción específica si la canción no se encuentra
        throw new NotFoundException(`La canción solicitada no existe.`);
      }
      throw new InternalServerErrorException()
    }
  }
}
