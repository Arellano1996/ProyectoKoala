import { PartialType } from '@nestjs/mapped-types';
import { CreateUsuariosCancionesLinkDto } from './create-usuarios-canciones-link.dto';

export class UpdateUsuariosCancionesLinkDto extends PartialType(CreateUsuariosCancionesLinkDto) {}
