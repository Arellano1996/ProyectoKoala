import { Module } from '@nestjs/common';
import { AutentificacionService } from './autentificacion.service';
import { AutentificacionController } from './autentificacion.controller';
import { JwtEstrategias } from './estrategias/jwt.estrategias';
import { TypeOrmModule } from '@nestjs/typeorm';
import { PassportModule } from '@nestjs/passport';
import { JwtModule } from '@nestjs/jwt';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { Usuario } from 'src/usuarios/entities/usuario.entity';
import { UsuariosModule } from 'src/usuarios/usuarios.module';
import { UsuariosService } from 'src/usuarios/usuarios.service';

@Module({
  controllers: [AutentificacionController],
  exports: [AutentificacionService, JwtEstrategias, PassportModule, JwtModule],
  providers: [AutentificacionService, JwtEstrategias],
  imports: [
    ConfigModule,
    TypeOrmModule.forFeature([ Usuario ]),
    UsuariosModule,
    PassportModule.register({ defaultStrategy: 'jwt' }),
    JwtModule.registerAsync({
      imports: [ ConfigModule ],
      inject: [ ConfigService ],
      useFactory: ( configService: ConfigService) => {
        // console.log( configService.get('JWT_SECRETO') ) 
        return {
          secret: configService.get('JWT_SECRETO'),
          signOptions: {
            expiresIn: '2h'
          }
        }
      }
    })
  ]
})
export class AutentificacionModule {}
