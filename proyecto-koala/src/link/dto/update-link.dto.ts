import { Equals, IsBoolean, IsOptional, IsUUID, IsUrl, Validate } from "class-validator";
import { validarQueElLinkExista } from "src/common/validaciones/validarQueElLinkExista";
import { validarQueElUuidCancionExista } from "src/common/validaciones/validarQueElUuidCancionExista";
import { validarQueElUuidUsuarioExista } from "src/common/validaciones/validarQueElUuidUsuarioExista";

export class UpdateLinkDto {

    //El parametro del usuarioId siempre se envía
    @IsUUID()
    @Validate( validarQueElUuidUsuarioExista )
    UsuarioId: string;

    @IsUUID()
    @Validate( validarQueElUuidCancionExista )
    CancionId: string;

    @IsUUID()
    @Validate( validarQueElLinkExista )
    LinkId: string;

    @IsUrl()
    @IsOptional()
    URL: string;

    @IsOptional()
    Descripcion: string;
    
    @IsOptional()
    Tono: string;
    
    @IsOptional()
    @IsBoolean()
    @Equals(true, { message: "Default no puede ser falso"})
    Default: boolean;
}
