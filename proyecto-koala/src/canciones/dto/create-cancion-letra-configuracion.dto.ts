import { IsString } from "class-validator";

export class CreateCancioneLetraConfiguracionDto{
    
    @IsString()
    Nombre: string;

    @IsString()
    ConfiguracionJSON: string;

    //Relaciones
    
    //Letra se relaciona al momento de hacer save desde Canción
    
}
