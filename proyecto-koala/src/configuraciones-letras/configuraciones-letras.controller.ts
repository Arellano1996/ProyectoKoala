import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { ConfiguracionesLetrasService } from './configuraciones-letras.service';
import { CreateConfiguracionesLetraDto } from './dto/create-configuraciones-letra.dto';
import { UpdateConfiguracionesLetraDto } from './dto/update-configuraciones-letra.dto';
import { UpdateConfiguracionesLetraParamsDto } from './dto/update-configuraciones-letra-params.dto';

@Controller('configuraciones')
export class ConfiguracionesLetrasController {
  constructor(private readonly configuracionesLetrasService: ConfiguracionesLetrasService) {}

  @Post()
  create(@Body() createConfiguracionesLetraDto: CreateConfiguracionesLetraDto) {
    return this.configuracionesLetrasService.create(createConfiguracionesLetraDto);
  }

  @Get()
  findAll() {
    return this.configuracionesLetrasService.findAll();
  }

  @Get(':id')
  findOne(@Param() { id } : UpdateConfiguracionesLetraParamsDto) {
    return this.configuracionesLetrasService.findOne(id);
  }

  @Patch(':id')
  update(
    @Param() { id } : UpdateConfiguracionesLetraParamsDto, 
    @Body() updateConfiguracionesLetraDto: UpdateConfiguracionesLetraDto) {
    return this.configuracionesLetrasService.update(id, updateConfiguracionesLetraDto);
  }

  @Delete(':id')
  remove(@Param() { id }: UpdateConfiguracionesLetraParamsDto) {
    return this.configuracionesLetrasService.remove(id);
  }
}
