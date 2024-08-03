import { Controller, Get, Post, Body, Patch, Param, Delete, Query, ParseUUIDPipe, UseGuards, Req } from '@nestjs/common';
import { UsuariosService } from './usuarios.service';
import { CreateUsuarioDto } from './dto/create-usuario.dto';
import { UpdateUsuarioDto } from './dto/update-usuario.dto';
import { PaginationDto } from 'src/common/paginacion.dto';
import { EditarCancionesUsuarioDto } from './dto/editar-canciones-usuario.dto';
import { Tracing } from 'trace_events';
import { iniciarSesion } from './dto/inisiar-sesion.dto';
import { AuthGuard } from '@nestjs/passport';
import { GetUsuario } from './decorators/get-usuario.decorator';
import { Usuario } from './entities/usuario.entity';
import { request } from 'http';

@Controller('usuarios')
export class UsuariosController {
  constructor(private readonly usuariosService: UsuariosService) {}

  @Post()
  create(@Body() createUsuarioDto: CreateUsuarioDto) {
    return this.usuariosService.create(createUsuarioDto);
  }

  @Post('iniciar-sesion')
  iniciarSesion(@Body() loginDto: iniciarSesion) {
    return this.usuariosService.iniciarSesion(loginDto);
  }

  @Get()
  findAll(@Query() paginationDto: PaginationDto) {
    return this.usuariosService.findAll( paginationDto );
  }

  @Get('privado')
  @UseGuards( AuthGuard() )
  testingRutaPrivada(
    @Req() request: Express.Request,
    // @Body() loginDto: iniciarSesion
    // @GetUsuario() usuario: Usuario
    @GetUsuario() usuario
  ){
     
    return {
      ok: true,
      message: 'Hola mundo',
      usuario
    }
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
