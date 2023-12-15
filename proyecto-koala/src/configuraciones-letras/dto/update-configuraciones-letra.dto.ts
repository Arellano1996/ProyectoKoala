import { PartialType } from '@nestjs/mapped-types';
import { CreateConfiguracionesLetraDto } from './create-configuraciones-letra.dto';

export class UpdateConfiguracionesLetraDto extends PartialType(CreateConfiguracionesLetraDto) {}
