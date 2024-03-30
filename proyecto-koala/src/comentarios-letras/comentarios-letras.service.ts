//#region Imports
import { Injectable, Logger } from '@nestjs/common';
import { CreateComentariosLetraDto } from './dto/create-comentarios-letra.dto';
import { UpdateComentariosLetraDto } from './dto/update-comentarios-letra.dto';
import erroresHandler from 'src/common/errores.handler';
import { ComentariosLetra } from './entities/comentarios-letra.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Letra } from 'src/letras/entities/letra.entity';
import { Repository } from 'typeorm';
import { ComentariosConPaginacion } from 'src/common/consultas/ComentariosConPaginacion';
import { ComentarioPorUUID } from 'src/common/consultas/ComentarioPorUUID';
//#endregion imports

@Injectable()
export class ComentariosLetrasService extends erroresHandler {
  
  constructor(
    @InjectRepository(ComentariosLetra)
    private readonly repository: Repository<ComentariosLetra>,

    @InjectRepository(Letra)
    private readonly repositoryLetra: Repository<Letra>,
    
  ) {
    super();
    this.logger = new Logger('Comentarios Service')
  }

  async create(createComentariosLetraDto: CreateComentariosLetraDto) {
    try {
      const Letra = await this.repositoryLetra.findOneBy({LetraId: createComentariosLetraDto.LetraId})

      const nuevoComentario = this.repository.create({ 
        Comentario: createComentariosLetraDto.Comentario,
        Nombre: createComentariosLetraDto.Nombre,
        Letra
      })
  
      await this.repository.save( nuevoComentario )
  
      return createComentariosLetraDto 
    } catch (error) {
      this.handleExceptions(error)
    }
  }

  async findAll() {
    try {
      return await ComentariosConPaginacion()
    } catch (error) {
      this.handleExceptions(error)
    }
  }

  async findOne(comentarioId: string) {
    try {
      return await ComentarioPorUUID( comentarioId )
    } catch (error) {
      this.handleExceptions(error)
    }
  }

  async update(comentarioId: string, updateComentariosLetraDto: UpdateComentariosLetraDto) {
    try {
      const comentario = await this.repository.preload({
        ComentariosLetraId: comentarioId,
        ...updateComentariosLetraDto
      })
      
      await this.repository.save( comentario )
  
      return comentario
    } catch (error) {
      this.handleExceptions(error)
    }
  }

  async remove(comentarioId: string) {
    try {

      const comentario = await this.repository.findOneBy({ ComentariosLetraId: comentarioId })

      const _comentario = await this.repository.createQueryBuilder('comentarios_letra')
      .where('comentarios_letra.ComentariosLetraId = :comentarioId', {
        comentarioId
      })
      .select([
        'comentarios_letra.Nombre',
        'comentarios_letra.Comentario'
      ])
      .getOne()

      await this.repository.remove( comentario )

      return _comentario
    } catch (error) {
      this.handleExceptions(error)
    }
  }
}
