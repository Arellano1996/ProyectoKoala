import { Injectable, Logger, UnauthorizedException } from '@nestjs/common';
import { CreateUsuarioDto } from './dto/create-usuario.dto';
import { UpdateUsuarioDto } from './dto/update-usuario.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Usuario } from './entities/usuario.entity';
import { Repository } from 'typeorm';
import erroresHandler from 'src/common/errores.handler';
import { PaginationDto } from 'src/common/paginacion.dto';
import { UsuariosConPaginacion } from 'src/common/consultas/UsuariosConPaginacion';
import { Cancion } from 'src/canciones/entities/cancion.entity';
import { EditarCancionesUsuarioDto } from './dto/editar-canciones-usuario.dto';
import { UsuariosConCancionesPorTermino } from 'src/common/consultas/UsuariosConCancionesPorTermino';

import * as bcrypt from 'bcrypt'
import { iniciarSesion } from './dto/inisiar-sesion.dto';
import { JwtPayload } from './interface/jwt-payload.interface';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class UsuariosService extends erroresHandler {
  constructor(
    @InjectRepository(Usuario)
    private readonly repository: Repository<Usuario>,

    @InjectRepository(Cancion)
    private readonly repositoryCancion: Repository<Cancion>,

    private readonly jwtService : JwtService
  ) {
    super();
    this.logger = new Logger('Usuarios Service');
  }

  async create(createUsuarioDto: CreateUsuarioDto) {
    try {
      
      const { Contrasena, ...resto } = createUsuarioDto

      const usuario = this.repository.create({
        ...resto,
        Contrasena: bcrypt.hashSync( Contrasena, 5 )
      });

      await this.repository.save(usuario);

      // return usuario;
      return {
        ...usuario,
        token: this.getJwtToken({ Id: usuario.UsuarioId })
      }
    } catch (error) {
      this.handleExceptions(error);
    }
  }
  
  async iniciarSesion(loginDto : iniciarSesion){
    try {
      
      const { Correo, Contrasena } = loginDto
  
      const usuario = await this.repository.findOne({
        where: { Correo: Correo.toLocaleLowerCase().trim() },
        select: { Correo: true, Contrasena: true, UsuarioId: true }
      })

      if( !usuario ) 
        throw new UnauthorizedException('Credenciales invalidas (correo)')
      
      if( !bcrypt.compareSync( Contrasena, usuario.Contrasena ) ) 
        throw new UnauthorizedException('Credenciales invalidas (contraseña)')
      
      const { Contrasena: pass  ,...usuarioSinContrasena} = usuario
       
      return {
        ...usuarioSinContrasena,
        token: this.getJwtToken({ Id: usuario.UsuarioId })
      }

    } catch (error) {
      this.handleExceptions(error);
    }
  }

  async findAll(paginationDto: PaginationDto) {
    try {
      const { limite = 0, skip = 0 } = paginationDto;

      return await UsuariosConPaginacion(limite, skip);
    } catch (error) {
      this.handleExceptions(error);
    }
  }

  async findByTerm(termino: string) {
    try {
      let usuario: Usuario | [Usuario[], number];

      usuario = await UsuariosConCancionesPorTermino(termino);

      return usuario;
    } catch (error) {
      this.handleExceptions(error);
    }
  }

  async update(usuarioId: string, updateUsuarioDto: UpdateUsuarioDto) {
    try {
      if (usuarioId != updateUsuarioDto.UsuarioId)
        this.handleExceptions(null, 'Información invalida');

      const usuario = await this.repository.preload(updateUsuarioDto);

      await this.repository.save(usuario);

      return await this.repository.findOne({
        where: { UsuarioId: usuarioId },
        // relations:{
        //   Canciones: true
        // }
      });
    } catch (error) {
      this.handleExceptions(error);
    }
  }

  async editarCancionesUsuario( usuarioId: string, editarCancionesUsuarioDto: EditarCancionesUsuarioDto ) {
    try {

      //Buscamos el usuario en la base de datos
      let usuario = await this.repository.findOne({
        where: {
          UsuarioId: usuarioId,
        },
        relations: {
          Canciones: true,
        },
      });

      if (editarCancionesUsuarioDto.EliminarCanciones.any())
        //De las canciones que tiene el usuario y quitamos las que esten en la lista de EliminarCanciones
        usuario.Canciones = usuario.Canciones.filter( x => !editarCancionesUsuarioDto.EliminarCanciones.includes(x.CancionId) )

      if (editarCancionesUsuarioDto.AgergarCanciones.any()) {
        //Recorremos uno por uno en la lista de AgregarCanciones
        editarCancionesUsuarioDto.AgergarCanciones.forEach((cancionId) => {

          //Creamos una instancia con los id's de AgregarCanciones
          const nuevaCancion = this.repositoryCancion.create({
            CancionId: cancionId,
          })

          //Agregamos la instancia nueva a nuestra lista de canciones actual
          usuario.Canciones.push(nuevaCancion);
        })

      }

      //Ya sea que hayamos agregado o quitado canciones guardamos
      await this.repository.save(usuario);

      //Regresamos nuestro usuario
      return await this.repository.findOne({
        where: {
          UsuarioId: usuarioId,
        },
        relations: {
          Canciones: true,
        },
      })

    } catch (error) {
      this.handleExceptions(error);
    }
  }

  async remove(usuarioId: string) {
    try {
      const usuario = await this.repository.findOneByOrFail({
        UsuarioId: usuarioId,
      });

      const _usuario = await this.repository
      .createQueryBuilder('usuario')
      .where('usuario.UsuarioId = :usuarioId', { usuarioId })
      .select(['usuario.Nombre', 'usuario.Correo'])
      .getOne();
      
      await this.repository.remove(usuario)

      return _usuario

    } catch (error) {
      this.handleExceptions(error, 'El usuario que intenta borrar no existe')
    }
  }

  private getJwtToken( payload : JwtPayload ){

    const token = this.jwtService.sign( payload )

    return token
  }
}
