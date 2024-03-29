import { IsString } from "class-validator";

export class CreateCancioneLetraComentarioDto{
    
    @IsString()
    Nombre: string;

    @IsString()
    Comentario: string;

    //Relaciones
    
    //Letra se relaciona al momento de hacer save desde Canción
    
}
