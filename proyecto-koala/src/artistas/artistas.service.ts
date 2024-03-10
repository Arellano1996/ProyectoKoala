//#region Import
import { Injectable, InternalServerErrorException, Logger } from '@nestjs/common';
import { CreateArtistaDto } from './dto/create-artista.dto';
import { UpdateArtistaDto } from './dto/update-artista.dto';
import { Artista } from './entities/artistas.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { isUUID } from 'class-validator';
import { formatearSlug } from 'src/common/formatear-slug';
import erroresHandler from 'src/common/errores.handler';
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

      return artista
    } 
    catch (error) 
    {
      this.handleExceptions(error, `El artista con el nombre: ${createArtistaDto.Nombre}, ya existe`)
    }
  }

  findAll() {
    try {
      return this.repository.find();
    } catch (error) {
      throw new InternalServerErrorException()
    }
  }

  async findByTerm(termino: string) {
  
    try {
      //Cuando se busca por termino, se puede usar el UUID, o un termino, en el primer caso se trae el resultado único y en el segundo se trae todas las coincidencias
      let artista: Artista | [Artista[], number]

      if( isUUID(termino) ){
        artista = await this.repository.findOneBy({ ArtistaId: termino })
      }
      else
      {
        //Se asocia la entidad repository<Artista> que está inyectada en el constructor y se especifica que se trabajará en la tabla artista en base de datos
        const queryBuilder = this.repository.createQueryBuilder('artista')
        //Este es un query SQL, ya que se estableció que se está trabajando en la tabla artista en la variable queryBuilder, hacemos un query donde podemos establecer variables.
        //El formato de las variables debe ser :{nombreVariable} en este caso se complementa con los porcentajes % para hacer el query LIKE correctamente
        artista = await queryBuilder
        .where('artista.Slug LIKE :artistaslug', {
          artistaslug: `%${formatearSlug(termino)}%`
        })
        .getManyAndCount()
      }
      
      return artista

    } catch (error) {
      throw new InternalServerErrorException()
    }
  }

  async update(ArtistaId: string, updateArtistaDto: UpdateArtistaDto) {

    if(ArtistaId != updateArtistaDto.ArtistaId) this.handleExceptions(null, 'Información invalida')

    return `This action updates a #${ArtistaId} artista`;
  }

  async remove(ArtistaId: string) {
    try {

      const artista = await this.repository.findOneBy({ ArtistaId });
      
      await this.repository.remove(artista);

    } catch (error) {
      this.handleExceptions(error);
    }
  }
}
