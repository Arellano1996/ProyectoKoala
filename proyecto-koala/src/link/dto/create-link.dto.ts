import { IsOptional, IsUUID, IsUrl, Validate } from "class-validator";
import { validarQueElLinkNoEsteRegitradoConLaMismaCancion } from "src/common/validations/validarQueElLinkNoEsteRegitradoConLaMismaCancion";
import { validarQueElUuidCancionExista } from "src/common/validations/validarQueElUuidCancionExista";
import { validarQueElUuidUsuarioExista } from "src/common/validations/validarQueElUuidUsuarioExista";
import { validarSiEsPrimerLinkEnRegistrarse } from "src/common/validations/validarSiEsPrimerLinkEnRegistrarse";

export class CreateLinkDto {

    @IsUrl()
    @Validate( validarQueElLinkNoEsteRegitradoConLaMismaCancion )
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
