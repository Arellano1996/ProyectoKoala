import { IsOptional, IsUUID } from "class-validator"

export class RecibirLetraSocket {
    @IsUUID()
    LetraId: string

    @IsUUID()
    UsuarioId: string

    @IsUUID()
    @IsOptional()
    ConfiguracionId: string
}