export interface EnviarLetraLive {
    UsuarioId: string
    LetraId:   string
    ConfiguracionId? : string
}

export interface RespuestaRecibirLetraLive {
    UsuarioId: string
    LetraId: string
}