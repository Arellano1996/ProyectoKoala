
//Para controlar en qué opcion estamos
export interface MenuCrearCancion {
    opcion: number
}

export interface CrearCancion {
    Lineas: Lineas[]
    Tamanio: string
}

export interface Lineas {
    Palabras: PalabrasCrearCancion[]
    Color: string
    SaltoLinea: boolean
    SeEstaEditando: boolean
}

export interface PalabrasCrearCancion {
    Palabra: string
    Acorde: Acorde
}

export interface Acorde {
    Acorde: string
    Posicion: string
}