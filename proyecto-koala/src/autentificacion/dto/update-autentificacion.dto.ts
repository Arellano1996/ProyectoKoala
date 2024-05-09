import { PartialType } from '@nestjs/mapped-types';
import { CreateAutentificacionDto } from './create-autentificacion.dto';

export class UpdateAutentificacionDto extends PartialType(CreateAutentificacionDto) {}
