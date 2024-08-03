import { Controller, Get, Post, Body, Patch, Param, Delete, ParseUUIDPipe, Query } from '@nestjs/common';
import { CancionesService } from './canciones.service';
import { CreateCancioneDto } from './dto/create-cancione.dto';
import { UpdateCancioneDto } from './dto/update-cancione.dto';
import { PaginationDto } from 'src/common/paginacion.dto';
import { updateCancionParamsDto } from './dto/update.cancion.params.dto';

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

  @Delete(':id')
  remove(@Param() { id }: updateCancionParamsDto) {
    return this.cancionesService.remove(id);
  }

  //Canciones por UsuarioId
  @Get('usuario/:id')
  traerCancionesDeUsuario(@Param('id') id: string) {
    return this.cancionesService.traerCancionesDeUsuario(id);
  }
}
