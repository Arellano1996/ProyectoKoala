import { IsArray, IsOptional, IsString, IsUUID, Validate } from "class-validator";
import { CreateComentariosLetraDto } from "src/comentarios-letras/dto/create-comentarios-letra.dto";
import { ComentariosLetra } from "src/comentarios-letras/entities/comentarios-letra.entity";
import { validarQueElUuidCancionExista } from "src/common/validations/validarQueElUuidCancionExista";
import { validarQueElUuidUsuarioExista } from "src/common/validations/validarQueElUuidUsuarioExista";
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

    @IsArray()
    @IsString({ each: true })
    @IsOptional()
    Comentarios?: string[] = [];
    
    @IsArray()
    @IsString({ each: true })
    @IsOptional()
    Configuraciones?: string[] = [];
}
