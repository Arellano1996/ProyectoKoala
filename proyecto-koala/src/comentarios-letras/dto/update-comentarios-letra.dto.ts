import { PartialType } from '@nestjs/mapped-types';
import { CreateComentariosLetraDto } from './create-comentarios-letra.dto';

export class UpdateComentariosLetraDto extends PartialType(CreateComentariosLetraDto) {}
