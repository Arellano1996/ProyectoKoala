import { Menu_Letra } from "../../../letras/interfaces/menu.letra.interface";

export interface Configuracion
{
    Tabla_Canciones: Tabla_Canciones,
    Menu_Letra: Menu_Letra,
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