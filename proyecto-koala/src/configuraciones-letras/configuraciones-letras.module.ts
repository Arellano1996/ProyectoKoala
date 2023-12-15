import { Module } from '@nestjs/common';
import { ConfiguracionesLetrasService } from './configuraciones-letras.service';
import { ConfiguracionesLetrasController } from './configuraciones-letras.controller';

@Module({
  controllers: [ConfiguracionesLetrasController],
  providers: [ConfiguracionesLetrasService],
})
export class ConfiguracionesLetrasModule {}
