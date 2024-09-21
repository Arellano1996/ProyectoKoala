import { Injectable } from '@angular/core';
import { CrearLetraCancion, Lineas } from '../interfaces/crear.cancion.interfaces';

@Injectable({
  providedIn: 'root'
})
export class FormatearLetraService {
  
  constructor() { }

  serializarTexto(letra: string, cancion: CrearLetraCancion){
    
    const lineas = letra.trim().split('\n');

    let lineaInicializada: Lineas = {
      Color: "",
      SeEstaEditando: false,
      Palabras: [],
    }
    let nuevaCancion: CrearLetraCancion = { Lineas: [], Tamanio: '1rem', Tono: cancion.Tono };
    
    let i = 0
    nuevaCancion.Lineas = lineas.map( linea => {
      i++
      return this.convertirStringEnLinea(linea, cancion.Lineas.length > 0 && cancion.Lineas[i - 1] ? cancion.Lineas[i - 1] : lineaInicializada )
    })
  
    return nuevaCancion
  }

  convertirCancionEnTexto(cancion: CrearLetraCancion){
    return cancion.Lineas.map(linea => {
      return this.convertirLineaEnString(linea)
    }).join('\n')
  }

  convertirLineaEnString(linea: Lineas){
    return linea.Palabras.map(p => p.Palabra).join(' ');
  }

  convertirStringEnLinea(texto: string, linea: Lineas){
    let nuevaLinea: Lineas = {
      Color: linea.Color,
      SeEstaEditando: false,
      Palabras: [],
    }
    const arregloString = texto.split(' ').filter( ( palabra: any ) => palabra.trim() !== '');
    
    let i = 0
    arregloString.map( palabra => {
      if(linea.Palabras.length > 0 && linea.Palabras[i] && linea.Palabras[i].Palabra === palabra){
        //Si las palabras son diferentes y tienen la misma posicion, se reinicia el acorde
        //Entonces deben tener la misma palabra en la misma posicion para mantener el acorde
        nuevaLinea.Palabras!.push(linea.Palabras[i])
      }
      //De lo contrario agrega la palabra inicializando el acorde
      else
      {
        nuevaLinea.Palabras!.push({
          Palabra: palabra,
          Acorde: {
            Acorde: '',
            Posicion: 1
          }
        })
      }
      i++
    })

    return nuevaLinea
  }
}
