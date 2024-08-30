import { Get, Inject, Injectable, Logger, Req, UnauthorizedException, UseGuards } from '@nestjs/common';
import { RegistrarUsuarioDto } from './dto/create-usuario.dto';
import { Repository } from 'typeorm';
import { Usuario } from 'src/usuarios/entities/usuario.entity';
import { iniciarSesion } from './dto/inisiar-sesion.dto';
import * as bcrypt from 'bcrypt'
import erroresHandler from 'src/common/errores.handler';
import { JwtPayload } from './interface/jwt-payload.interface';
import { JwtService } from '@nestjs/jwt';
import { InjectRepository } from '@nestjs/typeorm';
import { AuthGuard } from '@nestjs/passport';
import { GetUsuario } from './decorators/get-usuario.decorator';

@Injectable()
export class AutentificacionService extends erroresHandler {

  constructor( 
    @InjectRepository(Usuario)
    private repository: Repository<Usuario>,
    private readonly jwtService : JwtService
  ) {
    super();
    this.logger = new Logger('Autentificación Service');
  }

  async registrarse(createUsuarioDto: RegistrarUsuarioDto) {
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
      
      const { Contrasena: pass, Correo: email  ,...usuarioSinContrasena} = usuario
       
      return {
        ...usuarioSinContrasena,
        Token: this.getJwtToken({ Id: usuario.UsuarioId })
      }

    } catch (error) {
      this.handleExceptions(error);
    }
  }

  public getJwtToken( payload : JwtPayload ){

    const token = this.jwtService.sign( payload )

    return token
  }

  @Get('privado')
  @UseGuards( AuthGuard() )
  testingRutaPrivada(
    @Req() request: Express.Request,
    // @Body() loginDto: iniciarSesion
    // @GetUsuario() usuario: Usuario
    @GetUsuario() usuario
  ){
     
    return {
      ok: true,
      message: 'Hola mundo',
      usuario
    }
  }

}
