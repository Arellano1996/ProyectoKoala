import { ApiProperty, PartialType } from '@nestjs/swagger';
import { CreateArtistaDto } from './create-artista.dto';
import { IsUUID } from 'class-validator';

export class UpdateArtistaDto extends PartialType(CreateArtistaDto) {
    
    @ApiProperty({
        description: 'UUID del artista',
        nullable: false,
        uniqueItems: true
    })
    @IsUUID()
    ArtistaId: string;
}
