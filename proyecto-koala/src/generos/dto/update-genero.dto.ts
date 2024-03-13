import { PartialType } from '@nestjs/mapped-types';
import { CreateGeneroDto } from './create-genero.dto';
import { IsUUID } from 'class-validator';

export class UpdateGeneroDto extends PartialType(CreateGeneroDto) {
    @IsUUID()
    GeneroId: string;
}
