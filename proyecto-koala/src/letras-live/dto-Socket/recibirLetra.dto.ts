import { IsNumber, IsOptional, IsUUID } from "class-validator"

export class RecibirLetraSocket {
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