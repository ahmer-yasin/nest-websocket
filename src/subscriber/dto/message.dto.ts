import { IsString, IsEnum, IsNotEmpty } from '@nestjs/class-validator';

enum TypeEnum {
  SUBSCRIBE = 'Subscribe',
  UN_SUBSCRIBE = 'Unscubscribe',
  COUNT_SUBSCRIBERS = 'CountSubscribers',
  HEART_BEAT = 'heart_beat',
}

export class MessageDTO {
  @IsString()
  @IsNotEmpty()
  status: string;

  @IsString()
  @IsEnum(TypeEnum)
  type: TypeEnum;

  @IsString()
  updatedAt: Date;
}
