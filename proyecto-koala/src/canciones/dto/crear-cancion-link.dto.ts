import { IsOptional, IsUUID, IsUrl, Validate } from "class-validator";
import { validarQueElUuidUsuarioExista } from "src/common/validaciones/validarQueElUuidUsuarioExista";

export class CreateCancioneLinkDto{
    
    @IsUUID()
    UsuarioId: string;
    
    @IsUrl()
    URL: string;
    
    @IsOptional()
    Descripcion: string;
    
    @IsOptional()
    Tono: string;
    
    @IsOptional()
    Default: boolean = false;
}
