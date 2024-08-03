import { Component, ElementRef, EventEmitter, HostListener, OnInit, Output } from '@angular/core';
import { TablaCanciones } from './interfaces/tabla-canciones.interfaces';

@Component({
  selector: 'app-menu-despleglable',
  templateUrl: './menu-despleglable.component.html',
})
export class MenuDespleglableComponent implements OnInit{
  
  isMenuOpen = false;

  @Output()
  opcionesAPadre : EventEmitter<TablaCanciones> = new EventEmitter();
  
  opciones : TablaCanciones = {
    Artistas: true,
    Generos: true,
    Tono: true,
    BPM: true,
    Duracion: true
  }

  constructor(private elementRef: ElementRef) {
    this.initializeConfig();
  }

  ngOnInit(): void {
    this.opcionesAPadre.emit(this.opciones)
  }

  private initializeConfig(): void {
    const config = localStorage.getItem('config');
    if (config) {
      const parsedConfig = JSON.parse(config);
      this.opciones = parsedConfig.tablaCanciones;
    } else {
      this.opciones = {
        Artistas: true,
        Generos: true,
        Tono: true,
        BPM: true,
        Duracion: true,
      };
      const newConfig = {
        tablaCanciones: this.opciones
      };
      localStorage.setItem('config', JSON.stringify(newConfig));
    }
  }

  onCheckboxChange(event: Event, option: keyof TablaCanciones): void {
    //console.log(this.opciones)
    const inputElement = event.target as HTMLInputElement;
    this.opciones[option] = inputElement.checked;
    const updatedConfig = {
      tablaCanciones: this.opciones
    };
    localStorage.setItem('config', JSON.stringify(updatedConfig));

    this.opcionesAPadre.emit(this.opciones)
  }

  toggleMenu() {
    this.isMenuOpen = !this.isMenuOpen;
  }

  logout() {
    console.log('Logout');
    // Implementa la lógica de logout aquí
  }

  @HostListener('document:click', ['$event'])
  onDocumentClick(event: Event) {
    if (!this.elementRef.nativeElement.contains(event.target)) {
      this.isMenuOpen = false;
    }
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