import { IsOptional, IsUUID, IsUrl, Validate } from "class-validator";
import { validarQueElUuidUsuarioExista } from "src/common/validaciones/validarQueElUuidUsuarioExista";
import { Usuario } from "src/usuarios/entities/usuario.entity";

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
