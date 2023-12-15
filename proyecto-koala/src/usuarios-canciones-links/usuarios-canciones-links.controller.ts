import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { UsuariosCancionesLinksService } from './usuarios-canciones-links.service';
import { CreateUsuariosCancionesLinkDto } from './dto/create-usuarios-canciones-link.dto';
import { UpdateUsuariosCancionesLinkDto } from './dto/update-usuarios-canciones-link.dto';

@Controller('usuarios-canciones-links')
export class UsuariosCancionesLinksController {
  constructor(private readonly usuariosCancionesLinksService: UsuariosCancionesLinksService) {}

  @Post()
  create(@Body() createUsuariosCancionesLinkDto: CreateUsuariosCancionesLinkDto) {
    return this.usuariosCancionesLinksService.create(createUsuariosCancionesLinkDto);
  }

  @Get()
  findAll() {
    return this.usuariosCancionesLinksService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.usuariosCancionesLinksService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateUsuariosCancionesLinkDto: UpdateUsuariosCancionesLinkDto) {
    return this.usuariosCancionesLinksService.update(+id, updateUsuariosCancionesLinkDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.usuariosCancionesLinksService.remove(+id);
  }
}
