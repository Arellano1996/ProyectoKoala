import { Controller, Get, Post, Body, Patch, Param, Delete, ParseUUIDPipe, Query } from '@nestjs/common';
import { CancionesService } from './canciones.service';
import { CreateCancioneDto } from './dto/create-cancione.dto';
import { UpdateCancioneDto } from './dto/update-cancione.dto';
import { PaginationDto } from 'src/common/paginacion.dto';
import { deleteCancionParamsDto } from './dto/delete.cancion.params.dto';
import { updateCancionParamsDto } from './dto/update.cancion.params.dto copy';

@Controller('canciones')
export class CancionesController {
  constructor(private readonly cancionesService: CancionesService) {}

  @Post()
  create(@Body() createCancioneDto: CreateCancioneDto) {
    return this.cancionesService.create(createCancioneDto);
  }

  @Get()
  findAll( @Query() paginationDto: PaginationDto) {
    return this.cancionesService.findAll( paginationDto );
  }

  @Get(':termino')
  findByTerm(@Param('termino') termino: string) {
    return this.cancionesService.findByTerm(termino);
  }

  @Patch(':id')
  update(
    @Param() { id }: updateCancionParamsDto, 
    @Body() updateCancioneDto: UpdateCancioneDto) {
    return this.cancionesService.update(id, updateCancioneDto);
  }

  @Delete(':cancionId/:usuarioId')
  remove(@Param() { cancionId, usuarioId }: deleteCancionParamsDto) {
    return this.cancionesService.remove(cancionId);
  }

  //Canciones por UsuarioId
  @Get('usuario/:id')
  findAllByUsuarioId(
    @Param('id') id: string
  ) {
    return this.cancionesService.findAllByUsuarioId(id);
  }

  @Get('usuario/:id/:termino')
  findAllByUsuarioIdAndTerm(
    @Param('id') id: string,
    @Param('termino') termino: string,
  ) {
    return this.cancionesService.findAllByUsuarioIdAndTerm(id, termino);
  }
}
