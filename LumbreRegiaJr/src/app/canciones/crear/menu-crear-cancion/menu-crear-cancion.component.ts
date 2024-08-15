import { Component, EventEmitter, Input, Output } from '@angular/core';
import { CrearLetraCancion, MenuCrearCancion } from '../../interfaces/crear.cancion.interfaces';

@Component({
  selector: 'app-menu-crear-canciones',
  templateUrl: './menu-crear-canciones.component.html',
  styles: ``
})
export class MenuCrearCancionComponent {

  @Output() 
  estadoMenuHijo = new EventEmitter<number>();

  @Input() 
  cancion: CrearLetraCancion = { Lineas: [], Tamanio: '1rem' };
  
  //Esta variable sirve para manejar el estado de mi menu, para saber qué opcion está seleccionada al momento de crear una canción; se inicializa en el contructor en la primera opción Letra = 0
  menuCrearCancion: MenuCrearCancion;
  HoverButtons = 'hover:text-blue-400'

  constructor() {
    this.menuCrearCancion = {
      opcion: 0
    }    
  }
  //Cuando doy click en Editar en alguna Linea
  seleccionarOpcion(opcion: number){
    //Si se vuelve a seleccionar la misma opcion no hacer nada
    if(this.menuCrearCancion.opcion === opcion ) return
    if(this.menuCrearCancion.opcion === 0 && this.cancion.Lineas.length === 0 ) return

    //Actualizamos nuestra variable para manejar el estado de nuestro menu y saber en qué opcion estamos
    this.menuCrearCancion.opcion = opcion
    this.estadoMenuHijo.emit(opcion);
  }

}
