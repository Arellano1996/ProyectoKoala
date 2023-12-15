import { PartialType } from '@nestjs/mapped-types';
import { CreateLetraDto } from './create-letra.dto';

export class UpdateLetraDto extends PartialType(CreateLetraDto) {}
