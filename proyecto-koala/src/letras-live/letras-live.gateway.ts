import { OnGatewayConnection, OnGatewayDisconnect, SubscribeMessage, WebSocketGateway, WebSocketServer } from '@nestjs/websockets';
import { LetrasLiveService } from './letras-live.service';
import { Server, Socket } from 'socket.io';
import { RecibirLetraSocket } from './dto-Socket/recibirLetra.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { LetraLive } from './entities/letra-live.entity';
import { CrearLetraLive } from './dto-SQL/crear-letra-live-dto';
import { LetrasLiveSQLService } from './letras-live-sql.service';

@WebSocketGateway({ cors: true, namespace: '/letrasLive' })
// @WebSocketGateway({ cors: true, namespace: '/' })
export class LetrasLiveGateway implements OnGatewayConnection, OnGatewayDisconnect  {
  
  @WebSocketServer() wss: Server;
  constructor(private readonly letrasLiveService: LetrasLiveService,
    private readonly letrasLiveSQLService: LetrasLiveSQLService
    ) {}
  
  handleConnection(cliente: Socket, ) {
    //console.log( 'Cliente conectado: ', cliente.id )

    this.letrasLiveService.registrarCliente( cliente )//registra nuevo cliente en nuestra variable que almacena los id del socket

    console.log({ Conetados : this.letrasLiveService.getClientesConectados() })
  }
  
  handleDisconnect(cliente: Socket) {
    //console.log( 'Cliente desconectado: ', cliente.id )
    
    this.letrasLiveService.quitarCliente( cliente.id )
    
    console.log({ Conetados : this.letrasLiveService.getClientesConectados() })
  }

  //Aquí se reciben los objetos RecibirLetraSocketDto de los clientes
  @SubscribeMessage('EmitirLetra')
  async handlerLetrasLive( cliente: Socket, recibirLetraSocketDto: RecibirLetraSocket){
    //console.log(`se recibio una peticion socket:`)
    //console.log( recibirLetraSocketDto[0] )

    //Esto sirve para mandar al mismo cliente que emitio
    //cliente.emit('RecibirLetra', letraId)

    //Eliminar la letra-live del usuario (en teoria solo puede haber una letra por usuario)
    await this.letrasLiveSQLService.remove( recibirLetraSocketDto[0].UsuarioId )

    if(recibirLetraSocketDto[0].UsuarioId)
    //Guardar la letra que se mando llamar
    this.letrasLiveSQLService.create( recibirLetraSocketDto[0] )

    //La variable recibirLetraSocketDto es un arreglo de tipo 
    //RecibirLetraSocketDto en nuestra posicion [0]
    //y es un null en nuestra posicion [1]
    //Todos los clientes menos el que mande llamar este evento EmitirLetra se les mandará 
    //el objeto recibirLetraSocketDto[0]
    // cliente.broadcast.emit('RecibirLetra', recibirLetraSocketDto[0])

    //Esto sirve para enviar a todo el servidor
    this.wss.emit('RecibirLetra', recibirLetraSocketDto[0])

  }

}
