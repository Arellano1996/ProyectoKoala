import { IsObject, IsOptional, IsString } from "class-validator";
import { Letra } from "src/letras/entities/letra.entity";

export class CreateComentariosLetraDto {

    @IsString()
    Comentario: string;

    @IsOptional()
    Letra: Letra;
}
