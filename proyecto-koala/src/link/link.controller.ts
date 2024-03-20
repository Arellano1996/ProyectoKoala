import { Controller, Get, Post, Body, Patch, Param, Delete, ParseUUIDPipe } from '@nestjs/common';
import { LinkService } from './link.service';
import { CreateLinkDto } from './dto/create-link.dto';
import { UpdateLinkDto } from './dto/update-link.dto';
import { LinkPorUsuarioYCancion } from './modelos/LinkPorUsuarioYCancion.model';

@Controller('link')
export class LinkController {
  constructor(private readonly linkService: LinkService) {}

  @Post()
  create(@Body() createLinkDto: CreateLinkDto) {
    return this.linkService.create(createLinkDto);
  }

  
  @Get(':id')
  findAll(@Param('id', ParseUUIDPipe) id: string) {
    return this.linkService.EncontrarTodosLosLinksDeUnUsuario(id);
  }
  
  @Get()
  EncontrarTodosLosLinksPorUsuarioYCancion(@Body() linkPorUsuarioYCancion: LinkPorUsuarioYCancion ) {
    return this.linkService.EncontrarTodosLosLinksPorUsuarioYCancion(linkPorUsuarioYCancion);
  }
  
  @Patch(':id')
  update(@Param('id') id: string, @Body() updateLinkDto: UpdateLinkDto) {
    return this.linkService.update(+id, updateLinkDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.linkService.remove(+id);
  }
}
