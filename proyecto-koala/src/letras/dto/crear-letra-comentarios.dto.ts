import { IsOptional, IsString } from "class-validator";

export class CreateLetraComentariosDto {

    @IsString()
    @IsOptional()
    ComentarioId: string;

    @IsString()
    Nombre: string;

    @IsString()
    Comentario: string;
}