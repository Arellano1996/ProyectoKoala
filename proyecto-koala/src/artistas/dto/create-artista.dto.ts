import { ApiProperty } from "@nestjs/swagger";
import { IsString, MinLength } from "class-validator";

export class CreateArtistaDto {
    
    @ApiProperty({
        example: 'Ariel Camacho',
        description: 'Nombre del artista',
        nullable: false,
        minLength: 1,
        uniqueItems: true
    })
    @IsString()
    @MinLength(1)
    Nombre: string;
}
