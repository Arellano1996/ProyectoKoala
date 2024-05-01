import { ApiProperty } from "@nestjs/swagger";
import { IsString } from "class-validator";

export class CreateCancioneLetraComentarioDto{
    
    @ApiProperty()
    @IsString()
    Nombre: string;

    
    @ApiProperty()
    @IsString()
    Comentario: string;

    //Relaciones
    
    //Letra se relaciona al momento de hacer save desde Canción
    
}
