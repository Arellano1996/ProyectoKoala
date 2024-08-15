import { Artista, CrearArtista } from "../../artistas/interfaces/artistas.interface";
import { CrearGenero, Genero } from "../../generos/interfaces/generos.interfaces";
import { CrearCancionLetra, CrearLetra, Letra } from "../../letras/interfaces/letras.interfaces";
import { CrearCancionLink, CrearLink, Link } from "../../links/interfaces/links.interfaces";
import { Usuario } from "../../usuario/interfaces/usuario.interfaces";
//index
export interface Cancion {
    CancionId: string;
    UsuarioId: string;
    Nombre:    string;
    Slug:      string;
    Tono:      string;
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
    UsuarioId: string
    Nombre:    string
    Tono?:      string
    Duracion?: string
    Generos:   CrearGenero[]
    Artistas:  CrearArtista[]
    Links?:     CrearCancionLink[]
    Letras:    CrearCancionLetra[]
    Baterias: CrearCancionBateria[]
}
export interface CrearCancionResponse {
    CancionId: string
    // Nombre:   string
    // Tono:     string
    // Duracion: string
    // Artistas: Artista[]
    // Generos:  Genero[]
    // Baterias: Bateria[]
}

//Borrar Cancion
export interface BorrarCancion {
    Nombre:    string;
    Artistas:  Artista[];
}

//TODO:
//Se debe crear el modulo de baterias
export interface Bateria {
    Nombre: string
    Descripcion: string
    BPM: string
    URL: string
    Usuario: Usuario
}

export interface CrearBateria {
    Nombre: string
    Descripcion: string
    BPM: string
    URL: string
    Usuario: {
        UsuarioId: '7312787d-06d8-4d52-8674-44fcfe95798d'
    }
}

export interface CrearCancionBateria {
    Nombre: string
    Descripcion: string
    BPM: string
    URL: string
    Usuario: {
        UsuarioId: '7312787d-06d8-4d52-8674-44fcfe95798d'
    }
}