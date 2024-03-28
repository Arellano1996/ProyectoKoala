import { IsOptional, IsUrl } from "class-validator";

export class CreateCancioneLinkDto{
    
    @IsUrl()
    URL: string;
    
    @IsOptional()
    Descripcion: string;
    
    @IsOptional()
    Tono: string;
    
    @IsOptional()
    Default: boolean = false;

    //Relaciones

    //Usuario se relaciona al momento de validar
}
