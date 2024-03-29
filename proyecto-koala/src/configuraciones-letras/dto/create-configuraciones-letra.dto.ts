import { IsString, IsUUID } from "class-validator";
import { ValidarSiExisteLetraDesdeConfiguracion } from "../validations/validarSiExisteLetraDesdeConfiguracion";

export class CreateConfiguracionesLetraDto {

    @IsUUID()
    @ValidarSiExisteLetraDesdeConfiguracion()
    LetraId: string;

    @IsString()
    Nombre: string;

    @IsString()
    Configuracion: string;

}
