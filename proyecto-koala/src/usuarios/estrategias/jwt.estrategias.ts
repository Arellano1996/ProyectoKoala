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
    async validate( payload : JwtPayload ) : Promise<Usuario> {
        
        const { Correo } = payload

        const usuario = await this.usuarioRepositorio.findOneBy({ Correo })

        if( !usuario ) throw new UnauthorizedException('Token not valid')
        
        return usuario
    }

}