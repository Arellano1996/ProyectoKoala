import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { UsuariosCancionesLetrasService } from './usuarios-canciones-letras.service';
import { CreateUsuariosCancionesLetraDto } from './dto/create-usuarios-canciones-letra.dto';
import { UpdateUsuariosCancionesLetraDto } from './dto/update-usuarios-canciones-letra.dto';

@Controller('usuarios-canciones-letras')
export class UsuariosCancionesLetrasController {
  constructor(private readonly usuariosCancionesLetrasService: UsuariosCancionesLetrasService) {}

  @Post()
  create(@Body() createUsuariosCancionesLetraDto: CreateUsuariosCancionesLetraDto) {
    return this.usuariosCancionesLetrasService.create(createUsuariosCancionesLetraDto);
  }

  @Get()
  findAll() {
    return this.usuariosCancionesLetrasService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.usuariosCancionesLetrasService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateUsuariosCancionesLetraDto: UpdateUsuariosCancionesLetraDto) {
    return this.usuariosCancionesLetrasService.update(+id, updateUsuariosCancionesLetraDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.usuariosCancionesLetrasService.remove(+id);
  }
}
