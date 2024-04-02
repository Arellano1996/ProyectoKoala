import { Injectable, Logger } from '@nestjs/common';
import { CreateConfiguracionesLetraDto } from './dto/create-configuraciones-letra.dto';
import { UpdateConfiguracionesLetraDto } from './dto/update-configuraciones-letra.dto';
import erroresHandler from 'src/common/errores.handler';
import { ConfiguracionesLetra } from './entities/configuraciones-letra.entity';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { Letra } from 'src/letras/entities/letra.entity';
import { ConfiguracionesConPaginacion } from 'src/common/consultas/ConfiguracionesConPaginacion';
import { ConfiguracionesPorUUID } from 'src/common/consultas/ConfiguracionesPorUUID';

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
    try {
      const Letra = await this.repositoryLetra.findOneBy({LetraId: createConfiguracionesLetraDto.LetraId})

      const nuevaConfiguracion = this.repository.create({ 
        ConfiguracionJSON: createConfiguracionesLetraDto.Configuracion,
        Nombre: createConfiguracionesLetraDto.Nombre,
        Letra
      })
  
      await this.repository.save( nuevaConfiguracion )
  
      return createConfiguracionesLetraDto 
    } catch (error) {
      this.handleExceptions(error)
    }
  }

  async findAll() {
    try {
      return await ConfiguracionesConPaginacion()
    } catch (error) {
      this.handleExceptions(error)
    }
  }

  async findOne(configuracionId: string) {
    try {
      return await ConfiguracionesPorUUID( configuracionId )
    } catch (error) {
      this.handleExceptions(error)
    }
  }

  async update(configuracionId: string, updateConfiguracionesLetraDto: UpdateConfiguracionesLetraDto) {
    try {
      const configuración = await this.repository.preload({
        ConfiguracionesLetraId: configuracionId,
        ...updateConfiguracionesLetraDto
      })
      
      await this.repository.save( configuración )
  
      return configuración
    } catch (error) {
      this.handleExceptions(error)
    }
  }

  async remove(configuracionId: string) {
    try {

      const configuracion = await this.repository.findOneBy({ ConfiguracionesLetraId: configuracionId })

      const _configuracion = await this.repository.createQueryBuilder('configuraciones_letra')
      .where('configuraciones_letra.ConfiguracionesLetraId = :configuracionId', {
        configuracionId
      })
      .select([
        'configuraciones_letra.Nombre',
        'configuraciones_letra.ConfiguracionJSON'
      ])
      .getOne()

      await this.repository.remove( configuracion )

      return _configuracion
    } catch (error) {
      this.handleExceptions(error)
    }
  }
}
