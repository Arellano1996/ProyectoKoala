import { ApiProperty } from "@nestjs/swagger";
import { IsNotEmpty, IsString, MinLength } from "class-validator";

export class CreateArtistaDto {
    
    @ApiProperty({
        description: 'Nombre del artista',
        nullable: false,
        minLength: 1,
        uniqueItems: true
    })
    @IsString()
    @MinLength(1)
    Nombre: string;
}
