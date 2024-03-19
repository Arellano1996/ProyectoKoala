import { IsNotEmpty, IsOptional, IsUUID, IsUrl, Validate } from "class-validator";
import { validarQueElUuidCancionExista } from "src/common/validaciones/validarQueElUuidCancionExista";
import { validarQueElUuidUsuarioExista } from "src/common/validaciones/validarQueElUuidUsuarioExista";
import { validarSiEsPrimerLinkEnRegistrarse } from "src/common/validaciones/validarSiEsPrimerLinkEnRegistrarse";

export class CreateLinkDto {

    @IsUrl()
    URL: string;

    //Validar que exista
    @IsUUID()
    @Validate( validarQueElUuidUsuarioExista )
    UsuarioId: string;

    //Validar que exista
    @IsUUID()
    @Validate( validarQueElUuidCancionExista )
    CancionId: string;
    
    @IsOptional()
    Descripcion: string;
    
    @IsOptional()
    Tono: string;

    @IsOptional()
    @Validate( validarSiEsPrimerLinkEnRegistrarse )
    Default: boolean = false;
}
