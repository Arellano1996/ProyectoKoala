//#region imports
import { IsEmail, IsOptional, IsString, MinLength } from "class-validator";
//#endregion imports

export class RegistrarUsuarioDto {
    
    @IsString()
    @MinLength(1)
    Nombre: string;

    @IsString()
    @IsEmail()
    @MinLength(1)
    Correo: string;

    @IsString()
    @MinLength(4)
    Contrasena: string;

    @IsOptional()
    Suscripcion:string
}
