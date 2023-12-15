import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { ComentariosLetrasService } from './comentarios-letras.service';
import { CreateComentariosLetraDto } from './dto/create-comentarios-letra.dto';
import { UpdateComentariosLetraDto } from './dto/update-comentarios-letra.dto';

@Controller('comentarios-letras')
export class ComentariosLetrasController {
  constructor(private readonly comentariosLetrasService: ComentariosLetrasService) {}

  @Post()
  create(@Body() createComentariosLetraDto: CreateComentariosLetraDto) {
    return this.comentariosLetrasService.create(createComentariosLetraDto);
  }

  @Get()
  findAll() {
    return this.comentariosLetrasService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.comentariosLetrasService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateComentariosLetraDto: UpdateComentariosLetraDto) {
    return this.comentariosLetrasService.update(+id, updateComentariosLetraDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.comentariosLetrasService.remove(+id);
  }
}
