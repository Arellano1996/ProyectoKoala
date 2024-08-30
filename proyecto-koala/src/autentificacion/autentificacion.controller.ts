import { Controller, Get, Post, Body, UseGuards, Request  } from '@nestjs/common';
import { AutentificacionService } from './autentificacion.service';
import { RegistrarUsuarioDto } from './dto/create-usuario.dto';
import { iniciarSesion } from './dto/inisiar-sesion.dto';
import { AuthGuard } from '@nestjs/passport';
import { GetUsuario } from './decorators/get-usuario.decorator';
import { Usuario } from 'src/usuarios/entities/usuario.entity';
import { IniciarSesionResponse } from './interface/inciar-sesion.interface';

@Controller('autentificacion')
export class AutentificacionController {
  constructor(private readonly autentificacionService: AutentificacionService) {}

  @Post()
  registrarse(@Body() createUsuarioDto: RegistrarUsuarioDto) {
    return this.autentificacionService.registrarse(createUsuarioDto);
  }

  @Post('iniciar-sesion')
  iniciarSesion(@Body() loginDto: iniciarSesion) {
    return this.autentificacionService.iniciarSesion(loginDto);
  }

  @Get('private')
  @UseGuards(AuthGuard())
  testingPrivateRoute(
    //@GetUsuario() usuario: Usuario,
    // @GetUsuario('Correo') email: Usuario
    @GetUsuario('UsuarioId') UsuarioId: Usuario
  ){
    return {
      ok: true,
      message: 'Token Válido',
      UsuarioId,
      // email
    }
  }

  // LoginResponse
  //@UseGuards( AuthGuard )
  @Get('check-token')
  checkToken( @Request() req: Request ) {
      
    const user = req['user'] as Usuario;

    return {
      UsuarioId: '',
      Token: this.autentificacionService.getJwtToken({ Id: user.UsuarioId }),
    }

    /*
    return {
      user.UsuarioId,
      token: this.autentificacionService.getJwtToken({ Id: user.id })
    }
      */

  }



  
}
