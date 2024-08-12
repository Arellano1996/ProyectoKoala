import { Injectable } from '@angular/core';
import { CrearCancion } from '../interfaces/crear.cancion.interfaces';

@Injectable({
  providedIn: 'root'
})
export class FormatearLetraService {

  cancion: CrearCancion = { Lineas: [], Tamanio: '1rem' };
  
  constructor() { }

  serializarTexto(letra: string){
    
    const lineas = letra.split('\n');

    this.cancion.Lineas = lineas.map((linea: string) => ({
      SaltoLinea: (linea.trim().length === 0) ? true : false,
      SeEstaEditando: false,
      Color: '',
      Palabras: linea.split(' ').filter(palabra => palabra.trim() !== '').map((palabra: string) => ({
        Palabra: palabra,
        Acorde: {
          Acorde: '',
          Posicion: 2
        }
      }))
    }));

    // console.log(this.cancion);

    return this.cancion
  }
}
