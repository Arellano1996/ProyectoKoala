import { IsArray, IsOptional, IsString, IsUUID, Validate } from "class-validator";
import { CreateComentariosLetraDto } from "src/comentarios-letras/dto/create-comentarios-letra.dto";
import { ComentariosLetra } from "src/comentarios-letras/entities/comentarios-letra.entity";
import { validarQueElUuidCancionExista } from "src/common/validations/validarQueElUuidCancionExista";
import { validarQueElUuidUsuarioExista } from "src/common/validations/validarQueElUuidUsuarioExista";
import { ConfiguracionesLetra } from "src/configuraciones-letras/entities/configuraciones-letra.entity";
import { CreateLetraComentariosDto } from "./crear-letra-comentarios.dto";
import { CreateLetraConfiguracionesDto } from "./crear-letra-configuraciones.dto";
import { Type } from "class-transformer";

export class CreateLetraDto {

    @IsString()
    Letra: string;

    @IsString()
    @IsOptional()
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
    @Type(() => CreateLetraComentariosDto)
    @IsOptional()
    Comentarios?: CreateLetraComentariosDto[] = [];
    
    @IsArray()
    @Type(() => CreateLetraConfiguracionesDto)
    @IsOptional()
    Configuraciones?: CreateLetraConfiguracionesDto[] = [];
}
