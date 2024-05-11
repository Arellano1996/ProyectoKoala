import { PassportStrategy } from "@nestjs/passport";
import { ExtractJwt, Strategy } from "passport-jwt";
import { Usuario } from "../entities/usuario.entity";
import { JwtPayload } from "../interface/jwt-payload.interface";
import { InjectRepository } from "@nestjs/typeorm";
import { Repository } from "typeorm";
import { ConfigService } from "@nestjs/config";
import { Injectable, UnauthorizedException } from "@nestjs/common";

@Injectable()
export class JwtEstrategias extends PassportStrategy( Strategy ) {

    constructor(
        @InjectRepository( Usuario )
        private readonly usuarioRepositorio: Repository<Usuario>,
        configService : ConfigService
    ) {
    super({
        secretOrKey: configService.get('JWT_SECRETO'),
        jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken()
    });
        
    }
    // async validate( payload : JwtPayload ) : Promise<Usuario> {
    async validate( payload : JwtPayload ) {
        
        const { Id } = payload

        const usuario = await this.usuarioRepositorio.findOneBy({ UsuarioId: Id })

        if( !usuario ) throw new UnauthorizedException('Token not valid')
        
            
        // console.log(usuario)

        //Lo que se regrese aqui sera tomado como user en el request
        //return 'hola123'
         return usuario

        /*
         *
        export const RawHeader = createParamDecorator(
    ( data: string, ctx: ExecutionContext) => {

        const req = ctx.switchToHttp().getRequest()

        const usuario = req.user
    }
) 
         */

    }

}