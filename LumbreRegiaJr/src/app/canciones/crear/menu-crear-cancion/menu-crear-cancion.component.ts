import { Component, EventEmitter, Output } from '@angular/core';
import { MenuCrearCancion } from '../../interfaces/crear.cancion.interfaces';

@Component({
  selector: 'app-menu-crear-canciones',
  templateUrl: './menu-crear-canciones.component.html',
  styles: ``
})
export class MenuCrearCancionComponent {

  @Output() 
  estadoMenuHijo = new EventEmitter<number>();
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

    //Actualizamos nuestra variable para manejar el estado de nuestro menu y saber en qué opcion estamos
    this.menuCrearCancion.opcion = opcion
    this.estadoMenuHijo.emit(opcion);
    //Si pasamos a la opción 1 hay que serializar nuestra letra
    //TODO solo si nuestra Letra no está vacia
    if(opcion === 1 /* Acordes */){
      //this.serializarLetra()
    }
  }

}
