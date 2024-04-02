import { IsOptional, IsString } from "class-validator";
import { ValidarSiExisteComentarioDesdeLetra } from "../validations/ValidarSiExisteComentarioDesdeLetra";

export class CreateLetraComentariosDto {

    @IsString()
    @IsOptional()
    @ValidarSiExisteComentarioDesdeLetra()
    ComentarioId: string;

    @IsString()
    Nombre: string;

    @IsString()
    Comentario: string;
}