import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { ComentariosLetrasService } from './comentarios-letras.service';
import { CreateComentariosLetraDto } from './dto/create-comentarios-letra.dto';
import { UpdateComentariosLetraDto } from './dto/update-comentarios-letra.dto';
import { UpdateComentariosLetraParamsDto } from './dto/update-comentarios-letra-params.dto';

@Controller('comentarios')
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
  findOne(@Param() { id } : UpdateComentariosLetraParamsDto) {
    return this.comentariosLetrasService.findOne(id);
  }

  @Patch(':id')
  update(
    @Param() { id } : UpdateComentariosLetraParamsDto, 
  @Body() updateComentariosLetraDto: UpdateComentariosLetraDto) {
    return this.comentariosLetrasService.update( id, updateComentariosLetraDto);
  }

  @Delete(':id')
  remove(@Param() { id } : UpdateComentariosLetraParamsDto) {
    return this.comentariosLetrasService.remove(id);
  }
}
