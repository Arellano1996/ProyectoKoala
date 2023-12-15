import { PartialType } from '@nestjs/mapped-types';
import { CreateUsuariosCancionesLetraDto } from './create-usuarios-canciones-letra.dto';

export class UpdateUsuariosCancionesLetraDto extends PartialType(CreateUsuariosCancionesLetraDto) {}
