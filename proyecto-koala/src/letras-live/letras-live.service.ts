import { Injectable } from '@nestjs/common';
import { Socket } from 'socket.io';

interface ClientesConetados {
    [id: string]: Socket
}

@Injectable()
export class LetrasLiveService {

    private clientesConectados : ClientesConetados = { }

    registrarCliente( cliente: Socket){
        this.clientesConectados[cliente.id] = cliente
    }

    quitarCliente( clienteId: string){
        delete this.clientesConectados[clienteId]
    }

    getClientesConectados(): number {
        return Object.keys( this.clientesConectados ).length
    }
}
