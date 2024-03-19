import { Module } from '@nestjs/common';
import { LinkService } from './link.service';
import { LinkController } from './link.controller';
import { Usuario } from 'src/usuarios/entities/usuario.entity';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Cancion } from 'src/canciones/entities/cancion.entity';
import { Link } from './entities/link.entity';

@Module({
  controllers: [LinkController],
  providers: [LinkService],
  imports: [
    TypeOrmModule.forFeature([
      Link,
      Usuario,
      Cancion
    ])
  ]
})
export class LinkModule {}
