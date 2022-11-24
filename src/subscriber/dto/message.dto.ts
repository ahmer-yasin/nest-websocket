import { IsString, IsEnum, IsNotEmpty } from '@nestjs/class-validator';

export enum TypeEnum {
  SUBSCRIBE = 'Subscribe',
  UN_SUBSCRIBE = 'Unsubscribe',
  COUNT_SUBSCRIBERS = 'CountSubscribers',
  HEART_BEAT = 'heart_beat',
  ERROR = 'error',
}

export class MessageDTO {
  @IsString()
  type: string;
}
