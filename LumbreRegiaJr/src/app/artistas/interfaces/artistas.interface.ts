export interface Artista {
    ArtistaId: string;
    Nombre:    string;
    Slug:      string;
}

export interface ArtistaResponse {
    Artistas: Artista[],
    Total: number
}

//Crear Artista
export interface CrearArtista {
    Nombre:    string;
}
//Editar Artisa
export interface EditarArtista {
    ArtistaId: string;
    Nombre:    string;
}
//Borrar Artista
export interface BorrarArtista {
    Nombre:    string;
}
