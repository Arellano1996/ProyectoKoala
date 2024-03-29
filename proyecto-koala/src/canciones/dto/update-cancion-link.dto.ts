import { IsOptional, IsUUID, IsUrl } from "class-validator";
import { Link } from "src/link/entities/link.entity";
import { validarSiExisteLink } from "src/link/validations/validarSiExisteLink";

export class UpdateCancioneLinkDto{
    
    @IsUUID()
    @IsOptional()
    @validarSiExisteLink()
    LinkId: string;
    
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
