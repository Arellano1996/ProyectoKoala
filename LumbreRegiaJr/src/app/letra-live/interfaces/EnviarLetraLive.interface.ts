export interface EnviarLetraLive {
    UsuarioId?: string
    LetraId?:   string
    Tono?: number
    ConfiguracionId? : string
}

export interface RespuestaRecibirLetraLive {
    UsuarioId: string
    Tono: number
    LetraId: string
}