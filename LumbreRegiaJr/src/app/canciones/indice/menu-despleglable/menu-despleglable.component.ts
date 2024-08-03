import { Component, ElementRef, EventEmitter, HostListener, OnInit, Output } from '@angular/core';
import { ConfiguracionPaginaService } from '../../../shared/services/configuracion-pagina.service';
import { Configuracion, Tabla_Canciones } from '../../../shared/services/interfaces/tabla-canciones.interfaces';

@Component({
  selector: 'app-menu-despleglable',
  templateUrl: './menu-despleglable.component.html',
})
export class MenuDespleglableComponent implements OnInit{
  
  isMenuOpen = false;

  @Output()
  opcionesAPadre : EventEmitter<Configuracion> = new EventEmitter();
  
  configuracion : Configuracion;

  constructor(private elementRef: ElementRef,
    private configuracionPaginaService: ConfiguracionPaginaService
  ) {
    this.configuracion = this.configuracionPaginaService.obtenerConfiguracion();
  }

  ngOnInit(): void {
    this.opcionesAPadre.emit(this.configuracion)
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

  onCheckboxChange(event: Event, option: keyof Tabla_Canciones): void {
    //console.log(this.opciones)
    const inputElement = event.target as HTMLInputElement;
      //Aquí se sabe que solo puedo modificar las opciones de la tabla
      //por eso hago referencia a this.configuracion.Tabla_Canciones
      
      //Actualizamos nuestra cofiguracion
      this.configuracion.Tabla_Canciones[option] = inputElement.checked;

      //Llamamos al servicio para que guarde nuestra configuracion
      this.configuracionPaginaService.actualizarConfiguracion(this.configuracion)
      
      //Emitimos al padre
      this.opcionesAPadre.emit(this.configuracion)
  }
}

/*

Explicación detallada
HTML:

El menú se muestra u oculta basado en isMenuOpen.
Se usa *ngIf para condicionar la visibilidad del menú.
TypeScript:

ElementRef: Inyecta una referencia al elemento del componente.
@HostListener('document:click', ['$event']): Escucha los clics en todo el documento.
onDocumentClick: Método que se llama en cada clic en el documento. Verifica si el clic 
ocurrió fuera del elemento del componente (elementRef.nativeElement) y, si es así, cierra 
el menú.

Asegúrate de que este código esté implementado correctamente y de que el archivo 
dropdown.component.html y dropdown.component.ts estén enlazados correctamente en 
tu aplicación Angular. Este enfoque debe funcionar para ocultar el menú cuando se hace 
clic fuera de él. Si aún tienes problemas, verifica si hay errores en la consola del navegador 
que puedan dar más pistas sobre lo que podría estar fallando.

*/