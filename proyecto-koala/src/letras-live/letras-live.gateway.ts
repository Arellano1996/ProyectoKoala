import { OnGatewayConnection, OnGatewayDisconnect, WebSocketGateway } from '@nestjs/websockets';
import { LetrasLiveService } from './letras-live.service';
import { Socket } from 'socket.io';

@WebSocketGateway({ cors: true, namespace: '/letrasLive' })
export class LetrasLiveGateway implements OnGatewayConnection, OnGatewayDisconnect  {
  constructor(private readonly letrasLiveService: LetrasLiveService) {}
  
  handleConnection(client: Socket, ) {
    console.log( 'Cliente conectado: ', client.id )
  }
  
  handleDisconnect(client: Socket) {
    console.log( 'Cliente desconectado: ', client.id )
  }
}
