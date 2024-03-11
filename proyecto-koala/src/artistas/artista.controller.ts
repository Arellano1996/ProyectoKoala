//#region imports
import { Controller, Get, Post, Body, Patch, Param, Delete, ParseUUIDPipe, Query } from '@nestjs/common';
import { ArtistasService } from './artistas.service';
import { CreateArtistaDto } from './dto/create-artista.dto';
import { UpdateArtistaDto } from './dto/update-artista.dto';
import { PaginationDto } from 'src/common/paginacion.dto';
//#endregion imports

@Controller('artistas')
export class ArtistasController {
  constructor(private readonly artistasService: ArtistasService) {}

  @Post()
  create(@Body() createArtistaDto: CreateArtistaDto) {
    return this.artistasService.create(createArtistaDto);
  }

  @Get()
  findAll( @Query() paginationDto: PaginationDto) {
    return this.artistasService.findAll( paginationDto );
  }

  @Get(':termino')
  findByTerm(@Param('termino') termino: string) {
    return this.artistasService.findByTerm(termino);
  }

  @Patch(':id')
  update(@Param('id', ParseUUIDPipe) id: string, @Body() updateArtistaDto: UpdateArtistaDto) {
    return this.artistasService.update(id, updateArtistaDto);
  }

  @Delete(':id')
  remove(@Param('id', ParseUUIDPipe) id: string) {
    return this.artistasService.remove(id);
  }
}
