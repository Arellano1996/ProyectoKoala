import { IsUUID } from "class-validator";

export class LinkPorUsuarioYCancion {

    @IsUUID()
    //Validar que la canción exista
    CancionId: string;
    
    @IsUUID()
    //Validar que el usuario exista
    UsuarioId: string;
}