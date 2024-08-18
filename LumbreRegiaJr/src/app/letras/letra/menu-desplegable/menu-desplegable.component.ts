import { Component, ElementRef, HostListener, inject } from '@angular/core';
import { Menu_Letra } from '../../interfaces/menu.letra.interface';
import { ConfiguracionPaginaService } from '../../../shared/services/configuracion-pagina.service';
import { Configuracion } from '../../../shared/services/interfaces/tabla-canciones.interfaces';

@Component({
  selector: 'app-letra-menu-desplegable',
  templateUrl: './menu-desplegable.component.html',
  styles: ``
})
export class MenuDesplegableComponent {

  private elementRef = inject(ElementRef)
  isMenuOpen = false;
  configuracion : Configuracion;

  constructor(private configuracionPaginaService: ConfiguracionPaginaService) {
    this.configuracion = this.configuracionPaginaService.obtenerConfiguracion();
  }

  toggleMenu() {
    this.isMenuOpen = !this.isMenuOpen;
  }
  
  @HostListener('document:click', ['$event'])
  onDocumentClick(event: Event) {
    if (!this.elementRef.nativeElement.contains(event.target)) {
      this.isMenuOpen = false;
    }
  }
  
  onCheckboxChange(event: Event, option: keyof Menu_Letra): void {
    //console.log(this.opciones)
    const inputElement = event.target as HTMLInputElement;
      //Aquí se sabe que solo puedo modificar las opciones de la tabla
      //por eso hago referencia a this.configuracion.Tabla_Canciones
      
      //Actualizamos nuestra cofiguracion
      this.configuracion.Menu_Letra[option] = inputElement.checked;

      //Llamamos al servicio para que guarde nuestra configuracion
      this.configuracionPaginaService.actualizarConfiguracion(this.configuracion)
      
      //Emitimos al padre
      //this.opcionesAPadre.emit(this.configuracion)
  }

}
