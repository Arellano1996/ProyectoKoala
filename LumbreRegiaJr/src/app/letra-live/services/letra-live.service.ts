import { inject, Injectable, OnInit } from '@angular/core';
import { WebsocketService } from '../../services/websocket.service';
import { EnviarLetraLive, RespuestaRecibirLetraLive } from '../interfaces/EnviarLetraLive.interface';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { LetraLive } from '../interfaces/LetraLiveSQL.interface';
import { environments } from '../../../environments/environments';

@Injectable({
  providedIn: 'root'
})
export class LetraLiveService {

  webSocketService = inject(WebsocketService)
  http = inject(HttpClient)

  private baseUrl: string = environments.urlServido;
  
  constructor() {  }

  enviarLetra(enviarLetraLive: EnviarLetraLive){
    this.webSocketService.emitir('EmitirLetra', enviarLetraLive)
  }

  recibirLetra(): Observable<RespuestaRecibirLetraLive> {
    return this.webSocketService.escuchar<RespuestaRecibirLetraLive>('RecibirLetra')
  }

  obtenerLetraLiveSQL(): Observable<LetraLive> {
    return this.http.get<LetraLive>(`${ this.baseUrl }/letras-live/${ environments.usuarioArellano }`)
  }

}
