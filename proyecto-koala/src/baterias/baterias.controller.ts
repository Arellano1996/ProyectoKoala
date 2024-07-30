import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { BateriasService } from './baterias.service';
import { CreateBateriaDto } from './dto/create-bateria.dto';
import { UpdateBateriaDto } from './dto/update-bateria.dto';

@Controller('baterias')
export class BateriasController {
  constructor(private readonly bateriasService: BateriasService) {}

  @Post()
  create(@Body() createBateriaDto: CreateBateriaDto) {
    return this.bateriasService.create(createBateriaDto);
  }

  @Get()
  findAll() {
    return this.bateriasService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.bateriasService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateBateriaDto: UpdateBateriaDto) {
    return this.bateriasService.update(+id, updateBateriaDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.bateriasService.remove(+id);
  }
}
