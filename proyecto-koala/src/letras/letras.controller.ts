import { Controller, Get, Post, Body, Patch, Param, Delete, ParseUUIDPipe } from '@nestjs/common';
import { LetrasService } from './letras.service';
import { CreateLetraDto } from './dto/create-letra.dto';
import { UpdateLetraDto } from './dto/update-letra.dto';
import { FindLetraDto } from './dto/find-letra.dto';
import { UpdateLetraParamsDto } from './dto/update-letra-params.dto';
import { ApiTags } from '@nestjs/swagger';

@ApiTags('Letras')
@Controller('letras')
export class LetrasController {
  constructor(private readonly letrasService: LetrasService) {}

  @Post()
  create(@Body() createLetraDto: CreateLetraDto) {
    return this.letrasService.create(createLetraDto);
  }

  @Get()
  findAll(
    @Body() findLetraDto: FindLetraDto
    ) {
    return this.letrasService.findAll(findLetraDto);
  }

  @Get(':id')
  findOne(@Param('id', ParseUUIDPipe) id: string) {
    return this.letrasService.findOne(id);
  }

  @Patch(':id')
  update(@Param() { id } : UpdateLetraParamsDto, 
  @Body() updateLetraDto: UpdateLetraDto) {
    return this.letrasService.update(id, updateLetraDto);
  }

  @Delete(':id')
  remove(@Param() { id } : UpdateLetraParamsDto) {
    return this.letrasService.remove(id);
  }
}
