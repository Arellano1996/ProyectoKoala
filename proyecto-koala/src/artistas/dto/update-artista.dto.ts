import { PartialType } from '@nestjs/mapped-types';
import { CreateArtistaDto } from './create-artista.dto';
import { IsUUID } from 'class-validator';

export class UpdateArtistaDto extends PartialType(CreateArtistaDto) {
    @IsUUID()
    ArtistaId: string;
}
