import { IsUUID, Validate } from "class-validator";
import { validarSiExisteCancionConstraint } from "../validations/validarSiExisteCancionConstraint";
import { validarSiExisteCancion } from "../validations/validarSiExisteCancion";

export class updateCancionParamsDto {
    
    @IsUUID()
    @validarSiExisteCancion()
    id: string
}