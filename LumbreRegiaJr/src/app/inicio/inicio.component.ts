import { Component, inject } from '@angular/core';
import { AppComponent } from '../app.component';
import { WebsocketService } from '../services/websocket.service';

@Component({
  selector: 'app-inicio',
  templateUrl: './inicio.component.html',
  styles: ``
})
export class InicioComponent extends AppComponent{

  webSocketService = inject(WebsocketService)
  
  bienvenido = 'Hola @Arellano'
  
}
