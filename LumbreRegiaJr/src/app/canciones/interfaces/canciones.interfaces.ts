import { Artista, CrearArtista } from "../../artistas/interfaces/artistas.interface";
import { CrearGenero, Genero } from "../../generos/interfaces/generos.interfaces";
import { CrearLetra, Letra } from "../../letras/interfaces/letras.interfaces";
import { CrearLink, Link } from "../../links/interfaces/links.interfaces";
//index
export interface Cancion {
    CancionId: string;
    UsuarioId: string;
    Nombre:    string;
    Slug:      string;
    Tono:      null;
    Duracion:  string;
    Artistas:  Artista[];
    Generos:   Genero[];
    // Links:     Link[];
    // Letras:    Letra[];
}
//index resoponse
export interface CancionResponse {
    Canciones: Cancion[],
    Total: number
}
//Crear Cancion
export interface CrearCancion {
    UsuarioId: string;
    Nombre:    string;
    Tono?:      string;
    Generos:   CrearGenero[];
    Artistas:  CrearArtista[];
    Links?:     CrearLink[];
    Letras:    CrearLetra[];
}
export interface CrearCancionResponse {
    Nombre:   string;
    Tono:     string;
    Artistas: Artista[];
    Generos:  Genero[];
}

//Borrar Cancion
export interface BorrarCancion {
    Nombre:    string;
    Artistas:  Artista[];
}

