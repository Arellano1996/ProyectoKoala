import { ApiProperty } from "@nestjs/swagger";
import { IsString } from "class-validator";

export class CreateCancioneLetraConfiguracionDto{
    
    @ApiProperty()
    @IsString()
    Nombre: string;

    @ApiProperty()
    @IsString()
    ConfiguracionJSON: string;

    //Relaciones
    
    //Letra se relaciona al momento de hacer save desde Canción
    
}
