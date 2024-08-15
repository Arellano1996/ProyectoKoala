import { Component, Input } from '@angular/core';
import { CrearCancion, Lineas } from '../../../interfaces/crear.cancion.interfaces';

@Component({
  selector: 'app-div-grupo-acordes',
  templateUrl: './div-grupo-acordes.component.html',
  styles: ``
})
export class ToolTipAcordesComponent {
  colorAcorde: string = 'text-blue-500'
  
  @Input() i: number = 0; //Index
  @Input() Linea: Lineas = {
    Palabras: [],
    Color: '',
    SeEstaEditando: false
  };

  @Input() cancion: CrearCancion = { Lineas: [], Tamanio: '1rem' };

  activePopover: string = ''
  togglePopover(index: string, index2: string): void {
    const intexNumber = index + index2
    this.activePopover = this.activePopover === intexNumber ? '' : intexNumber;
  }

  cambioAcorde(linea: number, palabra: number, valor: string){
    this.cancion.Lineas[linea].Palabras[palabra].Acorde.Acorde = valor
  }
  
  cambioPosicionAcorde(linea: number, palabra: number, valor: number){
    const acorde = this.cancion.Lineas[linea].Palabras[palabra].Acorde
    if( !acorde.Acorde ) return
    acorde.Posicion = valor
  }
}
