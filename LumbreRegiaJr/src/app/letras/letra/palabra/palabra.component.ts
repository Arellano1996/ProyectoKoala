import { Component, Input } from '@angular/core';
import { CrearLetraCancion, Lineas } from '../../../canciones/interfaces/crear.cancion.interfaces';

@Component({
  selector: 'app-palabra-letra',
  templateUrl: './palabra.component.html',
  styles: ``
})
export class PalabraComponent {
  colorAcorde: string = 'text-blue-500'
  
  @Input() i: number = 0; //Index
  @Input() Linea: Lineas = {
    Palabras: [],
    Color: '',
    SeEstaEditando: false
  };

  @Input() cancion: CrearLetraCancion = { Lineas: [], Tamanio: '1rem', Tono: '' };

}
