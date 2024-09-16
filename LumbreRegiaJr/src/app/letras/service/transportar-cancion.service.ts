import { Injectable } from '@angular/core';
import { CrearLetraCancion, Lineas } from '../../canciones/interfaces/crear.cancion.interfaces';
import { acorde } from '../interfaces/acorde.interfaces';

@Injectable({
  providedIn: 'root'
})
export class TransportarCancionService {

  private acordes: acorde[] = [
    {
      tono: 'C',
      valor: 0
    },
    {
      tono: 'C#',
      valor: 1
    },
    {
      tono: 'D',
      valor: 2
    },
    {
      tono: 'D#',
      valor: 3
    },
    {
      tono: 'E',
      valor: 4
    },
    {
      tono: 'F',
      valor: 5
    },
    {
      tono: 'F#',
      valor: 6
    },
    {
      tono: 'G',
      valor: 7
    },
    {
      tono: 'G#',
      valor: 8
    },
    {
      tono: 'A',
      valor: 9
    },
    {
      tono: 'A#',
      valor: 10
    },
    {
      tono: 'B',
      valor: 11
    },
  ]
  private valor: number = 0
  private cancion: CrearLetraCancion = {
    Tamanio: '',
    Tono: '',
    Lineas: []
  }
  obtenerValorTono(tono: string){
    const tonoLimpio = tono.replace(/m|7/g, '');
    // Buscar el acorde en el array
    const acorde = this.acordes.find(a => a.tono === tonoLimpio);
    return acorde ? acorde.valor : undefined;
  }
  transportarCancion(cancion: CrearLetraCancion, valor: number){
    //Primero guardamos nuestro valor para saber si vamos a subir o bajar un semitono y que esta referencia este disponible
    //para todos los métodos
    this.valor = valor
    this.cancion = cancion
    //Segundo marcamos el nuevo tono de la letra
    this.transportarLetraTono()
    //Tercero transportamos linea por linea los acordes que vayamos encontrando
    cancion.Lineas.map( linea => { this.revisarLinea(linea) })
  }
  private revisarLinea(linea: Lineas){
    if(linea.Palabras.length > 0 ){
      if( linea.Palabras[0].Palabra.startsWith('@') ) 
        this.trasportarIntro(linea)
      else 
      this.transportarAcordesDeLineas(linea)
    }
  }
  private transportarLetraTono(){
    const indice = this.acordes.findIndex(x => x.tono === this.cancion.Tono.replace(/[m7]/g, '') )
    //console.log( cancion.Tono.replace(/[m7]/g, this.determinarIndice(indice) ) )
    this.cancion.Tono = this.trasportarAcorde(indice, this.cancion.Tono)
    //return this.cancion
  }
  private trasportarIntro(linea: Lineas){
    linea.Palabras.map( palabra => {
      //Si encontramos un texto que coincida con CDEFGAB tomamos el indice; se ignoran los caracteres como ()m7
      const indice = this.acordes.findIndex(x => x.tono === palabra.Palabra.replace(/[()m7]/g, '') )
      if(indice != -1) palabra.Palabra = this.trasportarAcorde( indice, palabra.Palabra )
    })
  }
  private transportarAcordesDeLineas(linea: Lineas){
    linea.Palabras.map( palabra => {
      const indice = this.acordes.findIndex( x => x.tono === palabra.Acorde.Acorde.replace(/[m7]/g, '') )
      if(indice != -1 ) palabra.Acorde.Acorde = this.trasportarAcorde( indice, palabra.Acorde.Acorde )
    })
  }
  private trasportarAcorde(indice: number, acorde: string){
    const regex = new RegExp( this.acordes[indice].tono, 'g')
    return acorde.replace(regex, this.determinarIndice(indice) )
  }
  private determinarIndice(i: number){
    //Si el valor es C = 0 y quieres bajar de tono mandas B = 11
    if(i === 0 && this.valor === -1) return this.acordes[11].tono
    //Si el valor es B = 11 y quieres subir de tono mandas C = 0
    if(i === 11 && this.valor === 1) return this.acordes[0].tono
    //Cuando transportamos por rango comprobamos si superamos el numero 12 o es igual restamos 12
    if(i + this.valor >= 12) return this.acordes[i + this.valor - 12].tono
    //A diferencia de arriba si la suma de los numero da 0 si es un valor valido
    //lo que no es valido es que de -1 en ese caso se suma 11
    if(i + this.valor < 0) return this.acordes[i + this.valor + 11].tono

    return this.acordes[i + this.valor].tono
  }
}
