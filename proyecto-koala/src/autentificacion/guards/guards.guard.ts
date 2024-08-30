import { CanActivate, ExecutionContext, Injectable, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { Observable } from 'rxjs';
import { JwtPayload } from '../interface/jwt-payload.interface';
import { AutentificacionService } from '../autentificacion.service';
import { UsuariosService } from 'src/usuarios/usuarios.service';

@Injectable()
export class GuardsGuard implements CanActivate {

  constructor(
    private jwtSevice: JwtService,
    private usuarioServicio: UsuariosService
  ) { }


  async canActivate( context: ExecutionContext ): Promise<boolean> {

    const request = context.switchToHttp().getRequest()
    const token = this.extractTokenFromHeader(request)

    if(!token){
      throw new UnauthorizedException('No hay un token')
    }

    try {
      const payload = await this.jwtSevice.verifyAsync<JwtPayload>(
        token, { secret: process.env.JWT_SECRETO }
      )

      const usuario = await this.usuarioServicio.findByTerm( payload.Id );
      if ( !usuario ) throw new UnauthorizedException('User does not exists');
      // if ( !usuario.isActive ) throw new UnauthorizedException('User is not active');
      
      request['user'] = usuario;

    } catch (error) {
      throw new UnauthorizedException()
    }

    return true


  }

  private extractTokenFromHeader( request: Request): string | undefined {
    const [type, token] = request.headers['authorizatoin']?.split(' ') ?? [];
    return type === 'Bearer' ? token: undefined
  }
}
