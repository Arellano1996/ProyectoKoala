import { OnGatewayConnection, OnGatewayDisconnect, WebSocketGateway } from '@nestjs/websockets';
import { LetrasLiveService } from './letras-live.service';
import { Socket } from 'socket.io';

@WebSocketGateway({ cors: true, namespace: '/letrasLive' })
// @WebSocketGateway({ cors: true, namespace: '/' })
export class LetrasLiveGateway implements OnGatewayConnection, OnGatewayDisconnect  {
  constructor(private readonly letrasLiveService: LetrasLiveService) {}
  
  handleConnection(cliente: Socket, ) {
    //console.log( 'Cliente conectado: ', client.id )

    this.letrasLiveService.registrarCliente( cliente )

    console.log({ Conetados : this.letrasLiveService.getClientesConectados() })
  }
  
  handleDisconnect(cliente: Socket) {
    //console.log( 'Cliente desconectado: ', cliente.id )
    
    this.letrasLiveService.quitarCliente( cliente.id )
    
    console.log({ Conetados : this.letrasLiveService.getClientesConectados() })
  }
}
