import { inject, Injectable } from '@angular/core';
import { WebsocketService } from '../../services/websocket.service';

@Injectable({
  providedIn: 'root'
})
export class LetraLiveServiceService {

  webSocketService = inject(WebsocketService)

  constructor() { 

  }

  enviarLetra(letraId: string){

    this.webSocketService.emitir('LetraLive', letraId)
    
  }

}
