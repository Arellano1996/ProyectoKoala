import { inject, Injectable } from '@angular/core';
import { Socket } from 'ngx-socket-io';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class WebsocketService {

  public socketEstado = false;

  socket = inject(Socket)

  constructor() {
    this.revisarEstado()
  }

  revisarEstado(){
    this.socket.on('connect', () => {
      //console.log('Conectado al servidor')
      this.socketEstado = true;
    })

    this.socket.on('disconnect', () => {
      //console.log('Desconectado al servidor')
      this.socketEstado = false;
    })
  }

  emitir( evento: string, payload?: any, callback?: Function ){
    //emit('evento', payload, callback?)
    this.socket.emit( evento, payload, callback );
  }

  escuchar<T>( evento: string ): Observable<T>{
    return this.socket.fromEvent<T>( evento )
  }

}
