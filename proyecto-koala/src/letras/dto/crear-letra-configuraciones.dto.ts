import { IsOptional, IsString } from "class-validator";

export class CreateLetraConfiguracionesDto {

    @IsString()
    @IsOptional()
    ConfiguracionId: string;

    @IsString()
    Nombre: string;

    @IsString()
    Configuracion: string;
}