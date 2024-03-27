import { IsArray, IsOptional, IsString, IsUUID, Validate } from "class-validator";
import { CreateComentariosLetraDto } from "src/comentarios-letras/dto/create-comentarios-letra.dto";
import { ComentariosLetra } from "src/comentarios-letras/entities/comentarios-letra.entity";
import { validarQueElUuidCancionExista } from "src/common/validaciones/validarQueElUuidCancionExista";
import { validarQueElUuidUsuarioExista } from "src/common/validaciones/validarQueElUuidUsuarioExista";
import { ConfiguracionesLetra } from "src/configuraciones-letras/entities/configuraciones-letra.entity";

export class CreateLetraDto {

    @IsString()
    Letra: string;

    @IsString()
    Acordes: string;
    
    //Validar que exista
    @IsUUID()
    @Validate( validarQueElUuidUsuarioExista )
    UsuarioId: string;

    //Validar que exista
    @IsUUID()
    @Validate( validarQueElUuidCancionExista )
    CancionId: string;

    @IsString({ each: true })
    @IsArray()
    @IsOptional()
    Comentarios?: string[];
    
    @IsArray()
    @IsOptional()
    ConfiguracionesLetra: ConfiguracionesLetra[];
}
