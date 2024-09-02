import { IsOptional, IsUUID } from "class-validator";

export class CrearLetraLive {

    @IsUUID()
    LetraId: string

    @IsUUID()
    UsuarioId: string

    @IsUUID()
    @IsOptional()
    ConfiguracionId: string
}