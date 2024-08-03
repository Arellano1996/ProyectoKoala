import { Cancion } from "../../canciones/interfaces/canciones.interfaces";

export interface Usuario {
    UsuarioId:           string;
    Nombre:              string;
    Slug:                string;
    Correo:              string;
    Socios:              null;
    Suscripcion:         null;
    HistorialDonaciones: null;
    Referidos:           null;
    CodigoReferido:      string;
    PerfilVerificado:    boolean;
    Canciones:           Cancion[];
}

export interface UsuarioResponse {
    Usuarios: Usuario[],
    Total: number
}
