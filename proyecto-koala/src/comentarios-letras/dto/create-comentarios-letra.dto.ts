import { IsOptional, IsString, IsUUID } from "class-validator";
import { Letra } from "src/letras/entities/letra.entity";
import { ValidarSiExisteLetraDesdeComentario } from "../validations/validarSiExisteLetraDesdeComentarios";

export class CreateComentariosLetraDto {

    @IsUUID()
    @ValidarSiExisteLetraDesdeComentario()
    LetraId: string;

    @IsString()
    Nombre: string;

    @IsString()
    Comentario: string;

    @IsOptional()
    Letra: Letra;
}
