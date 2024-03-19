import { IsNotEmpty, IsOptional, IsUUID, IsUrl } from "class-validator";

export class CreateLinkDto {

    @IsUrl()
    URL: string;

    //Validar que exista
    @IsNotEmpty()
    @IsUUID()
    UsuarioId: string;

    //Validar que exista
    @IsNotEmpty()
    @IsUUID()
    CancionId: string;
    
    @IsOptional()
    Descripcion: string;
    
    @IsOptional()
    Tono: string;

    @IsOptional()
    //Validar si es el primer insert
    Default: boolean = false;
}
