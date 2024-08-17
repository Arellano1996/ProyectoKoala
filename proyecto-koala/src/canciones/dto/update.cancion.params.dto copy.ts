import { IsUUID } from "class-validator";
import { validarSiExisteCancion } from "../validations/validarSiExisteCancion";

export class updateCancionParamsDto {
    
    @IsUUID()
    @validarSiExisteCancion()
    id: string
}