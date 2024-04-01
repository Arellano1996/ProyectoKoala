//#region Imports
import { Injectable, Logger } from '@nestjs/common';
import { CreateLetraDto } from './dto/create-letra.dto';
import { UpdateLetraDto } from './dto/update-letra.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Letra } from './entities/letra.entity';
import { Repository } from 'typeorm';
import erroresHandler from 'src/common/errores.handler';
import { Cancion } from 'src/canciones/entities/cancion.entity';
import { Usuario } from 'src/usuarios/entities/usuario.entity';
import { ComentariosLetra } from 'src/comentarios-letras/entities/comentarios-letra.entity';
import { ConfiguracionesLetra } from 'src/configuraciones-letras/entities/configuraciones-letra.entity';
import { LetrasConEntidades } from 'src/common/consultas/LetrasConEntidades';
import { FindLetraDto } from './dto/find-letra.dto';
import { LetrasConEntidadesPorUsuarioYCancion } from 'src/common/consultas/LetrasConEntidadesPorUsuarioYCancion';
import { LetraConEntidadesPorUUID } from 'src/common/consultas/LetraConEntidadesPorUUID';
//#endregion imports

@Injectable()
export class LetrasService extends erroresHandler {

  
  constructor(
    @InjectRepository(Letra)
    private readonly repository: Repository<Letra>,

    @InjectRepository(Cancion)
    private readonly repositoryCancion: Repository<Cancion>,

    @InjectRepository(Usuario)
    private readonly repositoryUsuario: Repository<Usuario>,

    @InjectRepository(ComentariosLetra)
    private readonly repositoryComentarios: Repository<ComentariosLetra>,

    @InjectRepository(ConfiguracionesLetra)
    private readonly repositoryConfiguraciones: Repository<ConfiguracionesLetra>,
  ) {
    super()
    this.logger = new Logger('Links Service')
  }
  async create(createLetraDto: CreateLetraDto) {

    const { Comentarios, Configuraciones, UsuarioId, CancionId, ...restoPropiedades } = createLetraDto
    
    const usuario = await this.repositoryUsuario.findOneByOrFail({ UsuarioId })
    const cancion = await this.repositoryCancion.findOneBy({ CancionId })
    
    const nuevaLetra = this.repository.create({
      ...restoPropiedades,
      Usuario: usuario,
      Cancion: cancion,
      Comentarios: Comentarios.map( comentario => this.repositoryComentarios.create({Comentario: comentario}) ),
      Configuraciones: Configuraciones.map( configuracion => this.repositoryConfiguraciones.create({ConfiguracionJSON: configuracion}) )
    })
    
    await this.repository.save( nuevaLetra )
    
    return nuevaLetra
  }

  async findAll(findLetraDto: FindLetraDto) {
    try {

      const { UsuarioId, CancionId } = findLetraDto

      if( UsuarioId === undefined || CancionId === undefined) return await LetrasConEntidades()

      return await LetrasConEntidadesPorUsuarioYCancion(UsuarioId, CancionId)
    } catch (error) {
      this.handleExceptions(error)
    }
  }

  async findOne(letraId: string) {
    try {
      return await LetraConEntidadesPorUUID(letraId)
    } catch (error) {
      this.handleExceptions(error)
    }
  }

  update(id: number, updateLetraDto: UpdateLetraDto) {
    return `This action updates a #${id} letra`;
  }

  remove(id: number) {
    return `This action removes a #${id} letra`;
  }
}
