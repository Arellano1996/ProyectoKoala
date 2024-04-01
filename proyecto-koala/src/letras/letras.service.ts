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
      Comentarios: Comentarios.map( comentario => this.repositoryComentarios.create({
        Nombre: comentario.Nombre,
        Comentario: comentario.Comentario
      }) ),
      Configuraciones: Configuraciones.map( configuracion => this.repositoryConfiguraciones.create({
        Nombre: configuracion.Nombre,
        ConfiguracionJSON: configuracion.Configuracion
      }) )
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

  //TODO validar que comentarios y configuraciones pertenecen a Letra
  //Llenar el campo de referencia de letra, en comentarios y configuraciones
  async update(letraId: string, updateLetraDto: UpdateLetraDto) {
    try {
      const { Comentarios, Configuraciones, ...resto } = updateLetraDto

      const letra = await this.repository.preload({
        LetraId: letraId,
        ...resto,
        Comentarios: Comentarios.map( comentario => this.repositoryComentarios.create({
          ComentariosLetraId: comentario.ComentarioId,
          Nombre: comentario.Nombre,
          Comentario: comentario.Comentario
        })),
        Configuraciones: Configuraciones.map( configuracion => this.repositoryConfiguraciones.create({
          ConfiguracionesLetraId: configuracion.ConfiguracionId,
          Nombre: configuracion.Nombre,
          ConfiguracionJSON: configuracion.Configuracion
        }))
      })

      await this.repository.save( letra )

      return letra
    } catch (error) {
      this.handleExceptions(error)
    }
  }

  async remove(letraId: string) {
    try {
      
    } catch (error) {
      this.handleExceptions(error)
    }
  }
}
