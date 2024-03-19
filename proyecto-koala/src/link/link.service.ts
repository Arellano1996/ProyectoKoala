//#region imports
import { Injectable, Logger } from '@nestjs/common';
import { CreateLinkDto } from './dto/create-link.dto';
import { UpdateLinkDto } from './dto/update-link.dto';
import erroresHandler from 'src/common/errores.handler';
import { InjectRepository } from '@nestjs/typeorm';
import { Link } from './entities/link.entity';
import { Repository } from 'typeorm';
import { LinksConUsuariosYCancionesConPaginacionPorUsuarioUUID } from 'src/common/consultas/LinksConUsuariosYCancionesConPaginacionPorUsuarioUUID';
//#endregion imports

@Injectable()
export class LinkService extends erroresHandler {

  constructor(
    
    @InjectRepository(Link)
    private readonly repository: Repository<Link>,

  ) {
    super();
    this.logger = new Logger('Links Service')
  }
  async create(createLinkDto: CreateLinkDto) {
    try {
      
      const { UsuarioId, CancionId, ...resto } = createLinkDto

      const link = this.repository.create({
        Cancion: {
          CancionId
        },
        Usuario: {
          UsuarioId
        },
        ...resto
      })
  
      return await this.repository.save(link) 
    } catch (error) {
      this.handleExceptions(error)
    }
  }

  //Todos los links de un usuario
  async findAll(usuarioId: string) {
    try {
      //Regresar solo los campos necesarios
      return await LinksConUsuariosYCancionesConPaginacionPorUsuarioUUID(usuarioId)
    } catch (error) {
      this.handleExceptions(error)
    }
  }

  //Todos los links de un usuario y de una canción en especifico
  async findOne(id: number) {
    return `This action returns a #${id} link`;
  }

  async update(id: number, updateLinkDto: UpdateLinkDto) {
    return `This action updates a #${id} link`;
  }

  async remove(id: number) {
    return `This action removes a #${id} link`;
  }
}
