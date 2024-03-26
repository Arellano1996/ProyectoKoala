import { IsOptional, IsUUID, IsUrl, Validate } from "class-validator";
import { validarQueElLinkNoEsteRegitradoConLaMismaCancion } from "src/common/validaciones/validarQueElLinkNoEsteRegitradoConLaMismaCancion";
import { validarSiEsPrimerLinkEnRegistrarse } from "src/common/validaciones/validarSiEsPrimerLinkEnRegistrarse";

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
    @Validate( validarSiEsPrimerLinkEnRegistrarse )
    Default: boolean = false;
}
