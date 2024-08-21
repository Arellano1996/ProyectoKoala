import { Component, inject, Input, numberAttribute } from '@angular/core';
import { TransportarCancionService } from '../../service/transportar-cancion.service';
import { CrearLetraCancion } from '../../../canciones/interfaces/crear.cancion.interfaces';
import { Letra } from '../../interfaces/letras.interfaces';
import { LetrasService } from '../../service/letras.service';
import { FormatearLetraService } from '../../../canciones/services/formatear-letra.service';

@Component({
  selector: 'app-letra-menu',
  templateUrl: './menu.component.html',
  styles: ``
})
export class MenuComponent {

  private transportarService = inject(TransportarCancionService)
  private formatearLetrasService = inject(FormatearLetraService);

  @Input() cancion: CrearLetraCancion = {
    Tamanio: '',
    Tono: '',
    Lineas: []
  }

  transportarCancion(valor: number){
    this.transportarService.transportarCancion(this.cancion, valor)
    //console.log( this.cancion )
  }
}
