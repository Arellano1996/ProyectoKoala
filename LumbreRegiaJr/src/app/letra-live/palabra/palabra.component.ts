import { Component, inject, Input, OnInit } from '@angular/core';
import { CrearLetraCancion, Lineas } from '../../canciones/interfaces/crear.cancion.interfaces';
import { ConfiguracionPaginaService } from '../../shared/services/configuracion-pagina.service';
import { Configuracion } from '../../shared/services/interfaces/tabla-canciones.interfaces';
import { Menu_Letra } from '../../letras/interfaces/menu.letra.interface';

@Component({
  selector: 'app-palabra-letra-live',
  templateUrl: './palabra.component.html',
})
export class PalabraLetraLiveComponent implements OnInit {
  
  configuracionPaginaService = inject(ConfiguracionPaginaService)
  colorAcorde: string = 'text-blue-500'
  menuLetra: Menu_Letra = this.configuracionPaginaService.configuracion.Menu_Letra

  @Input() i: number = 0; //Index
  @Input() Linea: Lineas = {
    Palabras: [],
    Color: '',
    SeEstaEditando: false
  };

  @Input() cancion: CrearLetraCancion = { Lineas: [], Tamanio: '1rem', Tono: '' };

  ngOnInit(): void {
    this.configuracionPaginaService.configuracion$.subscribe(
      (config: Configuracion) => {
        //this.configuracion = config;
        this.menuLetra = config.Menu_Letra
        //console.log('Configuración actualizada:', config);
      }
    );
  }
  
}
