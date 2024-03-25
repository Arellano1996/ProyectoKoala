import { Module } from '@nestjs/common';
import { ConfiguracionesLetrasService } from './configuraciones-letras.service';
import { ConfiguracionesLetrasController } from './configuraciones-letras.controller';
import { ConfiguracionesLetra } from './entities/configuraciones-letra.entity';
import { TypeOrmModule } from '@nestjs/typeorm';

@Module({
  controllers: [ConfiguracionesLetrasController],
  providers: [ConfiguracionesLetrasService],
  imports: [
    TypeOrmModule.forFeature([
      ConfiguracionesLetra
    ])
  ]
})
export class ConfiguracionesLetrasModule {}
