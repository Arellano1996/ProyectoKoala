import { Injectable, Logger } from '@nestjs/common';
import { CreateLetraDto } from './dto/create-letra.dto';
import { UpdateLetraDto } from './dto/update-letra.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Letra } from './entities/letra.entity';
import { privateDecrypt } from 'crypto';
import { Repository } from 'typeorm';
import erroresHandler from 'src/common/errores.handler';
import { Cancion } from 'src/canciones/entities/cancion.entity';
import { Usuario } from 'src/usuarios/entities/usuario.entity';
import { CreateUsuarioDto } from 'src/usuarios/dto/create-usuario.dto';
import { ComentariosLetra } from 'src/comentarios-letras/entities/comentarios-letra.entity';
import { CreateComentariosLetraDto } from 'src/comentarios-letras/dto/create-comentarios-letra.dto';

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
    private readonly repositoryComentario: Repository<ComentariosLetra>,
  ) {
    super()
    this.logger = new Logger('Links Service')
  }
  async create(createLetraDto: CreateLetraDto) {

    const { Comentarios: comentarios = [], ConfiguracionesLetra = [], UsuarioId, CancionId, ...restoPropiedades } = createLetraDto
    
    const usuario = await this.repositoryUsuario.findOneByOrFail({ UsuarioId })
    const cancion = await this.repositoryCancion.findOneBy({ CancionId })
    
    const nuevaLetra = this.repository.create({
      ...restoPropiedades,
      Usuario: usuario,
      Cancion: cancion,
      Comentarios: comentarios.map( comentario => this.repositoryComentario.create({Comentario: comentario}) )
    })
    
    await this.repository.save( nuevaLetra )
    
    return nuevaLetra
  }

  findAll() {
    return `This action returns all letras`;
  }

  findOne(id: number) {
    return `This action returns a #${id} letra`;
  }

  update(id: number, updateLetraDto: UpdateLetraDto) {
    return `This action updates a #${id} letra`;
  }

  remove(id: number) {
    return `This action removes a #${id} letra`;
  }
}
