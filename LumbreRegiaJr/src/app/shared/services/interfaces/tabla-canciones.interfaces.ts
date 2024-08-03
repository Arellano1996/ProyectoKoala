export interface Configuracion
{
    Tabla_Canciones: Tabla_Canciones,
    OcultarCancionesDeOtrosUsuarios: boolean;
}

export interface Tabla_Canciones
{
    Artistas: boolean;
    Generos: boolean;
    Tono: boolean;
    BPM: boolean;
    Duracion: boolean;
}