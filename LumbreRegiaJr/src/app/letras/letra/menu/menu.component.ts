import { Component, inject, Input } from '@angular/core';
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
    //Si la canción que se está transportando esta en modo live,
    //entonces se debe mandar la letra con el valor de tono actualizado
    if(this.esLetraLive){
      this.clickOnLive(false)
    }
    //console.log( this.cancion )
  }
  
  clickOnLive(desactivar: boolean = true){
    //Si se vuelve a tocar el live entonces se desactiva la canción en modo live
    const nuevoEnviarLetraLive: EnviarLetraLive = {}
    if(!this.esLetraLive || !desactivar){
      //Valor del tono de la canción, ya que el usaurio puede modificar la tonalidad
      const valorTono = this.transportarService.obtenerValorTono(this.cancion.Tono);
      
      nuevoEnviarLetraLive.UsuarioId = environments.usuarioArellano,
      nuevoEnviarLetraLive.Tono = valorTono!,
      nuevoEnviarLetraLive.LetraId = this.LetraId
    }

    this.letraLiveService.enviarLetra( nuevoEnviarLetraLive )
  }
}
