import { WebSocketGateway, WebSocketServer, OnGatewayConnection, OnGatewayDisconnect, SubscribeMessage } from '@nestjs/websockets';
import { Server, Socket } from 'socket.io';

@WebSocketGateway()
export class ChatGateway implements OnGatewayConnection, OnGatewayDisconnect {
    @WebSocketServer()
    server: Server;
  
    handleConnection(client: Socket) {}
  
    handleDisconnect(client: Socket) {}
  
    @SubscribeMessage('chatMessage')
    handleChat(client: Socket, message: string) {
      this.server.emit('chatMessage', message);
    }
}