import { Controller, Get, Body, Patch, Param, Delete, Query, ParseUUIDPipe, UseGuards, Req } from '@nestjs/common';
import { UsuariosService } from './usuarios.service';
import { UpdateUsuarioDto } from './dto/update-usuario.dto';
import { PaginationDto } from 'src/common/paginacion.dto';
import { EditarCancionesUsuarioDto } from './dto/editar-canciones-usuario.dto';
import { AuthGuard } from '@nestjs/passport';
import { GetUsuario } from 'src/autentificacion/decorators/get-usuario.decorator';

@Controller('usuarios')
export class UsuariosController {
  constructor(private readonly usuariosService: UsuariosService) {}

  @Get()
  findAll(@Query() paginationDto: PaginationDto) {
    return this.usuariosService.findAll( paginationDto );
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.usuariosService.findByTerm(id);
  }

  @Patch(':id')
  update(@Param('id', ParseUUIDPipe) id: string, @Body() updateUsuarioDto: UpdateUsuarioDto) {
    return this.usuariosService.update(id, updateUsuarioDto);
  }

  @Patch('editarCancionesUsuario/:id')
  editarCancionesUsuario(@Param('id', ParseUUIDPipe) id: string, @Body() editarCancionesUsuarioDto: EditarCancionesUsuarioDto) {
    return this.usuariosService.editarCancionesUsuario(id, editarCancionesUsuarioDto);
  }

  @Delete(':id')
  remove(@Param('id', ParseUUIDPipe) id: string) {
    return this.usuariosService.remove(id);
  }

  //Canciones del usuario
  @Get('canciones/:id')
  getCancionesUsuario(
    @Param('id', ParseUUIDPipe) usuarioId: string,
) {
    return this.usuariosService.getCancionesUsuario( usuarioId );
  }
}
