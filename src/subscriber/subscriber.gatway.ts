/* eslint-disable @typescript-eslint/no-unused-vars */
import {
  WebSocketGateway,
  WebSocketServer,
  SubscribeMessage,
  OnGatewayConnection,
  OnGatewayDisconnect,
  MessageBody,
  ConnectedSocket,
} from '@nestjs/websockets';
import { MessageDTO } from './dto/message.dto';

@WebSocketGateway()
export class SubscriberGateway
  implements OnGatewayConnection, OnGatewayDisconnect
{
  @WebSocketServer() server;
  users = 0;
  constructor() {
    this.server.on('error', (error) => {
      console.log(error);
    });
  }
  async handleConnection() {
    // A client has connected
    // Notify connected clients of current users
    this.server.emit('users', this.users);
    console.log(`users ${this.users}`);
  }
  async handleDisconnect() {
    // A client has disconnected
    // Notify connected clients of current users
    this.server.emit('users', this.users);
    console.log(`users ${this.users}`);
  }

  @SubscribeMessage('Subscribe')
  async onSubscribe(client, message: MessageDTO) {
    await this.waitMessage(4);
    this.users++;
    client.broadcast.emit('Subscribe', {
      type: 'Subscribe',
      status: 'Subscribed',
      updatedAt: new Date(),
    });
  }

  @SubscribeMessage('Unsubscribe')
  async onUnSubscribe(client, message: MessageDTO) {
    await this.waitMessage(8);
    this.users--;
    client.broadcast.emit('Unsubscribe', {
      type: 'Unscubscribe',
      status: 'unsubscribed',
      updatedAt: new Date(),
    });
  }

  @SubscribeMessage('CountSubscribers')
  async onCountSubscribers(client, message: MessageDTO) {
    client.broadcast.emit('CountSubscribers', {
      type: 'CountSubscribers',
      count: this.users,
      updatedAt: new Date(),
    });
  }

  @SubscribeMessage('my-event')
  onChgEvent(
    @MessageBody() message: any,
    @ConnectedSocket() socket: Socket,
  ): void {
    socket.broadcast.emit('my-event', message);
  }

  waitMessage(time) {
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        resolve(true);
      }, time * 1000);
    });
  }
}
