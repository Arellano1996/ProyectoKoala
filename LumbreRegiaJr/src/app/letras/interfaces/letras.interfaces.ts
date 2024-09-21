import { Cancion } from "../../canciones/interfaces/canciones.interfaces";
import { Comentario } from "../../comentarios-letras/interfaces/comentarios.interfaces";
import { Configuracione } from "../../configuraciones-letras/interfaces/configuraciones.interfaces";
import { Usuario } from "../../usuario/interfaces/usuario.interfaces";

export interface Letra {
    LetraId:         string;
    Letra:           string;
    Tono:         string;
    Comentarios:     Comentario[];
    Configuraciones: Configuracione[];
    Usuario?: Usuario
    Cancion?: Cancion
}

export interface CrearCancionLetra {
    Letra:           string;
    Tono?: string;
    //Comentarios se va a eliminar
    //Comentarios:     Comentario[];
    //Configuraciones: Configuracione[];
}

export interface CrearLetra {
    UsuarioId:         string;
    CancionId:         string;
    Letra:           string;
    Tono?: string;
    Comentarios:     Comentario[];
    Configuraciones: Configuracione[];
}

export interface EditarLetra {
    Letra:           string;
    Tono?: string;
    Comentarios?:     Comentario[];
    Configuraciones?: Configuracione[];
}