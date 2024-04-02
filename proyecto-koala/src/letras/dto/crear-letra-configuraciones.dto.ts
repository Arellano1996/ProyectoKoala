import { IsOptional, IsString } from "class-validator";
import { ValidarSiExisteConfiguracionDesdeLetra } from "../validations/ValidarSiExisteConfiguracionDesdeLetra";

export class CreateLetraConfiguracionesDto {

    @IsString()
    @IsOptional()
    @ValidarSiExisteConfiguracionDesdeLetra()
    ConfiguracionId: string;

    @IsString()
    Nombre: string;

    @IsString()
    Configuracion: string;
}