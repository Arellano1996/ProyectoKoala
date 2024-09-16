import { IsNumber, IsOptional, IsUUID } from "class-validator";

export class CrearLetraLive {

    @IsUUID()
    LetraId: string

    @IsUUID()
    UsuarioId: string

    @IsNumber()
    Tono: number

    @IsUUID()
    @IsOptional()
    ConfiguracionId: string
}