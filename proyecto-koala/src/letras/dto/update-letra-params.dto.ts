import { IsUUID } from "class-validator";
import { ValidarSiExisteLetra } from "../validations/validarSiExisteLetra";

export class UpdateLetraParamsDto {

    @IsUUID()
    @ValidarSiExisteLetra()
    id: string;
}
