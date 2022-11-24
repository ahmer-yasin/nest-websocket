/* eslint-disable @typescript-eslint/no-unused-vars */
import {
  WebSocketGateway,
  WebSocketServer,
  SubscribeMessage,
  OnGatewayConnection,
  OnGatewayDisconnect,
  MessageBody,
} from '@nestjs/websockets';
import { MessageDTO, TypeEnum } from './dto/message.dto';

@WebSocketGateway()
export class SubscriberGateway
  implements OnGatewayConnection, OnGatewayDisconnect
{
  @WebSocketServer() server;
  users = 0;
  async handleConnection() {
    // A client has connected
    // Notify connected clients of current users
    // this.server.emit('users', this.users);
    // console.log(`users ${this.users}`);
  }
  async handleDisconnect() {
    // A client has disconnected
    // Notify connected clients of current users
    // this.server.emit('users', this.users);
    // console.log(`users ${this.users}`);
  }

  @SubscribeMessage('event')
  async onClickEvent(
    client,
    @MessageBody() message: MessageDTO,
  ): Promise<void> {
    switch (message.type) {
      case TypeEnum.SUBSCRIBE:
        await this.waitMessage(4);
        this.users++;
        this.server.emit(TypeEnum.SUBSCRIBE, {
          type: TypeEnum.SUBSCRIBE,
          status: 'subscribed',
          count: this.users,
          updatedAt: new Date(),
        });
        break;
      case TypeEnum.UN_SUBSCRIBE:
        await this.waitMessage(8);
        this.users--;
        this.server.emit(TypeEnum.UN_SUBSCRIBE, {
          type: TypeEnum.UN_SUBSCRIBE,
          status: 'unsubscribed',
          count: this.users,
          updatedAt: new Date(),
        });
        break;
      case TypeEnum.COUNT_SUBSCRIBERS:
        console.log(this.users);
        this.server.emit(TypeEnum.COUNT_SUBSCRIBERS, {
          type: TypeEnum.COUNT_SUBSCRIBERS,
          count: this.users,
          updatedAt: new Date(),
        });
        break;
      case TypeEnum.HEART_BEAT:
        console.log(this.users);
        this.server.emit(TypeEnum.HEART_BEAT, {
          type: TypeEnum.HEART_BEAT,
          message: 'pong',
          updatedAt: new Date(),
        });
        break;

      default:
        this.server.emit(TypeEnum.ERROR, {
          type: 'error',
          error: 'Requested method not implemented',
          updatedAt: new Date(),
        });
        break;
    }
    return;
  }

  waitMessage(time) {
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        resolve(true);
      }, time * 1000);
    });
  }
}
