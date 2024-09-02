import { Component, EventEmitter, inject, Input, Output } from '@angular/core';
import { TransportarCancionService } from '../../service/transportar-cancion.service';
import { CrearLetraCancion } from '../../../canciones/interfaces/crear.cancion.interfaces';
import { EnviarLetraLive } from '../../../letra-live/interfaces/EnviarLetraLive.interface';
import { environments } from '../../../../environments/environments';
import { LetraLiveService } from '../../../letra-live/services/letra-live.service';

@Component({
  selector: 'app-letra-menu',
  templateUrl: './menu.component.html',
  styles: ``
})
export class MenuComponent {
  
  private transportarService = inject(TransportarCancionService)
  private letraLiveService = inject(LetraLiveService)
  
  @Input() cancion: CrearLetraCancion = {
    Tamanio: '',
    Tono: '',
    Lineas: []
  }
  
  @Input() LetraId: string = ''
  @Input() esLetraLive: boolean = false
  
  transportarCancion(valor: number){
    this.transportarService.transportarCancion(this.cancion, valor)
    //console.log( this.cancion )
  }
  
  clickOnLive(){
    const nuevoEnviarLetraLive: EnviarLetraLive = {
      UsuarioId: environments.usuarioArellano,
      LetraId: this.LetraId
    }
    
    this.letraLiveService.enviarLetra( nuevoEnviarLetraLive )
  }
}
