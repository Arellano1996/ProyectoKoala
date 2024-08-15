import { IsNotEmpty, IsOptional, IsSemVer, IsString, IsUUID, IsUrl, MinLength, Validate, ValidateNested, minLength } from "class-validator";
import { ComentariosLetra } from "src/comentarios-letras/entities/comentarios-letra.entity";
import { validarQueElUuidUsuarioExista } from "src/common/validations/validarQueElUuidUsuarioExista";
import { ConfiguracionesLetra } from "src/configuraciones-letras/entities/configuraciones-letra.entity";
import { Letra } from "src/letras/entities/letra.entity";
import { Usuario } from "src/usuarios/entities/usuario.entity";
import { CreateCancioneLetraConfiguracionDto } from "./create-cancion-letra-configuracion.dto";
import { Type } from "class-transformer";
import { CreateCancioneLetraComentarioDto } from "./create-cancion-letra-comentarios.dto";

export class CreateCancioneLetraDto{
    
    @IsString()
    Letra: string;

    @IsString()
    @IsOptional()
    Tono: string;

    //Relaciones
    
    //Cancion se relaciona al momento de hacer save desde Canción
    //Usuario se relaciona al momento de validar
    Usuario: Usuario;

    @IsOptional()
    @Type(() => CreateCancioneLetraComentarioDto) // Transforma cada objeto al objeto especificado
    @ValidateNested({ each: true })
    Comentarios: CreateCancioneLetraComentarioDto[] = [];
    
    @IsOptional()
    @Type(() => CreateCancioneLetraConfiguracionDto) // Transforma cada objeto al objeto especificado
    @ValidateNested({ each: true })
    Configuraciones: CreateCancioneLetraConfiguracionDto[] = [];
}
