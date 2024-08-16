
//Para controlar en qué opcion estamos
export interface MenuCrearCancion {
    opcion: number
}

export interface CrearLetraCancion {
    Lineas: Lineas[]
    Tamanio: string,
    Tono: ''
}

export interface Lineas {
    Palabras: PalabrasCrearCancion[]
    Color: string
    SeEstaEditando: boolean
}

export interface PalabrasCrearCancion {
    Palabra: string
    Acorde: Acorde
} 

export interface Acorde {
    Acorde: string
    Posicion: number
}
