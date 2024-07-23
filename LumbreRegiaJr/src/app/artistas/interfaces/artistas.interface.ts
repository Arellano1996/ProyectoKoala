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
