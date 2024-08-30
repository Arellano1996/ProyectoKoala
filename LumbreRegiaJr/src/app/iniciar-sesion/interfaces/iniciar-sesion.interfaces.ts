export interface IniciarSesion {
    Correo: string
    Contrasena: string
}

export interface IniciarSesionRespuesta {
    UsuarioId: string
    Token: string
}

export interface UsuarioAutentificado {
    UsuarioId: string
}