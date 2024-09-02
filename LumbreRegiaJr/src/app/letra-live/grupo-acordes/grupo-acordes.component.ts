import { Component, Input } from '@angular/core';
import { CrearLetraCancion, Lineas } from '../../canciones/interfaces/crear.cancion.interfaces';

@Component({
  selector: 'app-grupo-acordes-letra-live',
  templateUrl: './grupo-acordes.component.html'
})
export class GrupoAcordesLetraLiveComponent {

  @Input() Linea: Lineas = {
    Palabras: [],
    Color: '',
    SeEstaEditando: false
  };

  @Input() cancion: CrearLetraCancion = { Lineas: [], Tamanio: '1rem', Tono: '' }
  
  @Input() i: number = 0; //Index
  
}
