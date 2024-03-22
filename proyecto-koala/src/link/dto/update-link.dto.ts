import { IsOptional, IsUUID, IsUrl, Validate } from "class-validator";
import { validarQueElLinkLePertenezcaAlUsuario } from "src/common/validaciones/validarQueElLinkLePertenezcaAlUsuario";
import { validarQueElLinkNoEsteRegitradoConLaMismaCancionMismoUsuarioYDiferenteAUnLinkId } from "src/common/validaciones/validarQueElLinkNoEsteRegitradoConLaMismaCancionMismoUsuarioYDiferenteAUnLinkId";
import { validarQueElUuidCancionExista } from "src/common/validaciones/validarQueElUuidCancionExista";
import { validarQueElUuidUsuarioExista } from "src/common/validaciones/validarQueElUuidUsuarioExista";

export class UpdateLinkDto {

    @IsUUID()
    @Validate( validarQueElLinkLePertenezcaAlUsuario )
    LinkId: string;

    @IsUrl()
    @IsOptional()
    @Validate( validarQueElLinkNoEsteRegitradoConLaMismaCancionMismoUsuarioYDiferenteAUnLinkId )
    URL: string;

    //El parametro del usuarioId siempre se envía
    @IsUUID()
    @Validate( validarQueElUuidUsuarioExista )
    UsuarioId: string;

    @IsUUID()
    @Validate( validarQueElUuidCancionExista )
    CancionId: string;

    @IsOptional()
    Descripcion: string;
    
    @IsOptional()
    Tono: string;
    
    @IsOptional()
    //TODO:
    //Si se manda true, todos los demas links son falsos
    Default: boolean;
}
