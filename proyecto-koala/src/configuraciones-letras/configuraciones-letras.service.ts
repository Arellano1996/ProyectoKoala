import { Injectable, Logger } from '@nestjs/common';
import { CreateConfiguracionesLetraDto } from './dto/create-configuraciones-letra.dto';
import { UpdateConfiguracionesLetraDto } from './dto/update-configuraciones-letra.dto';
import erroresHandler from 'src/common/errores.handler';
import { ConfiguracionesLetra } from './entities/configuraciones-letra.entity';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { Letra } from 'src/letras/entities/letra.entity';

@Injectable()
export class ConfiguracionesLetrasService extends erroresHandler{

  constructor(
    @InjectRepository(ConfiguracionesLetra)
    private readonly repository: Repository<ConfiguracionesLetra>,

    @InjectRepository(Letra)
    private readonly repositoryLetra: Repository<Letra>,

  ) {
    super();
    this.logger = new Logger('Configuraciones Service')
  }
  async create(createConfiguracionesLetraDto: CreateConfiguracionesLetraDto) {
    
    const Letra = await this.repositoryLetra.findOneBy({LetraId: createConfiguracionesLetraDto.LetraId})

    const nuevaConfiguracion = this.repository.create({ 
      ConfiguracionJSON: createConfiguracionesLetraDto.Configuracion,
      Nombre: createConfiguracionesLetraDto.Nombre,
      Letra
    })

    await this.repository.save( nuevaConfiguracion )

    return createConfiguracionesLetraDto
  }

  findAll() {
    return `This action returns all configuracionesLetras`;
  }

  findOne(id: number) {
    return `This action returns a #${id} configuracionesLetra`;
  }

  update(id: number, updateConfiguracionesLetraDto: UpdateConfiguracionesLetraDto) {
    return `This action updates a #${id} configuracionesLetra`;
  }

  remove(id: number) {
    return `This action removes a #${id} configuracionesLetra`;
  }
}
