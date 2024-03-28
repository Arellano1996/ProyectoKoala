import { IsNotEmpty, IsOptional, IsSemVer, IsString, IsUUID, IsUrl, MinLength, Validate, minLength } from "class-validator";
import { ComentariosLetra } from "src/comentarios-letras/entities/comentarios-letra.entity";
import { validarQueElUuidUsuarioExista } from "src/common/validaciones/validarQueElUuidUsuarioExista";
import { ConfiguracionesLetra } from "src/configuraciones-letras/entities/configuraciones-letra.entity";
import { Letra } from "src/letras/entities/letra.entity";
import { Usuario } from "src/usuarios/entities/usuario.entity";

export class CreateCancioneLetraDto{
    
    @IsString()
    Letra: string;

    @IsString()
    @IsOptional()
    Acordes: string;

    //Relaciones
    
    //Cancion se relaciona al momento de hacer save desde Canción
    //Usuario se relaciona al momento de validar

    // @IsOptional()
    // Comentarios: string[];
    // @IsOptional()
    // Configuraciones: string[];
}
