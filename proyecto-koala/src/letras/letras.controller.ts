import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { LetrasService } from './letras.service';
import { CreateLetraDto } from './dto/create-letra.dto';
import { UpdateLetraDto } from './dto/update-letra.dto';

@Controller('letras')
export class LetrasController {
  constructor(private readonly letrasService: LetrasService) {}

  @Post()
  create(@Body() createLetraDto: CreateLetraDto) {
    return this.letrasService.create(createLetraDto);
  }

  @Get()
  findAll() {
    return this.letrasService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.letrasService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateLetraDto: UpdateLetraDto) {
    return this.letrasService.update(+id, updateLetraDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.letrasService.remove(+id);
  }
}
