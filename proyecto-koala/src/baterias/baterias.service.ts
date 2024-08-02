import { Inject, Injectable, Logger } from '@nestjs/common';
import { CreateBateriaDto } from './dto/create-bateria.dto';
import { UpdateBateriaDto } from './dto/update-bateria.dto';
import erroresHandler from 'src/common/errores.handler';
import { InjectRepository } from '@nestjs/typeorm';
import { Bateria } from './entities/bateria.entity';
import { Repository } from 'typeorm';
import { UsuariosService } from 'src/usuarios/usuarios.service';
import { CancionesService } from 'src/canciones/canciones.service';
import { CancionPorUUID } from 'src/common/consultas/CancionPorUUID';
import { UsuarioPorUUID } from 'src/common/consultas/UsuarioPorUUID';

@Injectable()
export class BateriasService extends erroresHandler{

  constructor(
    @InjectRepository(Bateria)
    private readonly repository: Repository<Bateria>,
  ) {
    super();
    this.logger = new Logger('Canciones Service')
  }
  
  async create(createBateriaDto: CreateBateriaDto) {
    try {
      // const { UsuarioId, Canciones, ...restoPropiedades } = createBateriaDto;
      const { Usuario, ...restoPropiedades } = createBateriaDto;

      //Primero necesitamos nuestras instancias a relacionar Usuario y Cancion[]
      const usuario = await UsuarioPorUUID(Usuario.UsuarioId);

      const bateria = this.repository.create({
        ...restoPropiedades,
        Usuario: { ...usuario }
      })
      
      await this.repository.save( bateria )
      return bateria;

    } catch (error) {
      this.handleExceptions(error, `La bateria con el nombre: ${createBateriaDto.Nombre}, ya existe`)
    }
  }

  findAll() {
    return `This action returns all baterias`;
  }

  findOne(id: number) {
    return `This action returns a #${id} bateria`;
  }

  update(id: number, updateBateriaDto: UpdateBateriaDto) {
    return `This action updates a #${id} bateria`;
  }

  remove(id: number) {
    return `This action removes a #${id} bateria`;
  }
}
