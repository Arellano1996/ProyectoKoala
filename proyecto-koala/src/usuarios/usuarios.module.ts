import { Module } from '@nestjs/common';
import { UsuariosService } from './usuarios.service';
import { UsuariosController } from './usuarios.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Usuario } from './entities/usuario.entity';
import { Cancion } from 'src/canciones/entities/cancion.entity';
import { Link } from 'src/link/entities/link.entity';
import { PassportModule } from '@nestjs/passport';
import { JwtModule } from '@nestjs/jwt';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { JwtEstrategias } from './estrategias/jwt.estrategias';

@Module({
  controllers: [UsuariosController],
  exports: [UsuariosService, JwtEstrategias, TypeOrmModule, PassportModule, JwtModule ],
  providers: [UsuariosService, JwtEstrategias],
  imports: [
    ConfigModule,
    TypeOrmModule.forFeature([ 
      Usuario,
      Cancion,
      Link
     ]),
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
  ],
})
export class UsuariosModule {}
