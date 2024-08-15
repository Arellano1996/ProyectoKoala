export interface Link {
    LinkId:      string;
    URL:         string;
    Descripcion: null | string;
    Tono:        null | string;
    Default:     boolean;
}

//Crear
export interface CrearLink {
    URL:         string;
    UsuarioId:      string;
    CancionId:      string;
}

export interface CrearCancionLink {
    URL:         string;
    Descripcion:      string;
}