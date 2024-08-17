import { IsUUID } from "class-validator";
import { validarSiExisteCancion } from "../validations/validarSiExisteCancion";
import { validarSiExisteUsuario } from "../validations/validarSiExisteUsuario";
import { validarSiExisteCancionConUsuarioId } from "../validations/validarSiExisteCancionConUsuarioId";

export class deleteCancionParamsDto {
    
    @IsUUID()
    @validarSiExisteCancion()
    @validarSiExisteCancionConUsuarioId()
    cancionId: string

    @IsUUID()
    @validarSiExisteUsuario()
    usuarioId: string
}