import { Comentario } from "../../comentarios-letras/interfaces/comentarios.interfaces";
import { Configuracione } from "../../configuraciones-letras/interfaces/configuraciones.interfaces";
import { Usuario } from "../../usuario/interfaces/usuario.interfaces";

export interface Letra {
    LetraId:         string;
    Letra:           string;
    Acordes:         null | string;
    Comentarios:     Comentario[];
    Configuraciones: Configuracione[];
    Usuario: Usuario
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