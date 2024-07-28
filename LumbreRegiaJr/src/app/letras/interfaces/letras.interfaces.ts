import { Comentario } from "../../comentarios-letras/interfaces/comentarios.interfaces";
import { Configuracione } from "../../configuraciones-letras/interfaces/configuraciones.interfaces";

export interface Letra {
    LetraId:         string;
    Letra:           string;
    Acordes:         null | string;
    Comentarios:     Comentario[];
    Configuraciones: Configuracione[];
}

export interface CrearLetra {
    UsuarioId:         string;
    CancionId:         string;
    Letra:           string;
    Acordes:         null | string;
    Comentarios:     Comentario[];
    Configuraciones: Configuracione[];
}