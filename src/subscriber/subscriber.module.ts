import { Module } from '@nestjs/common';
import { SubscriberGateway } from './subscriber.gatway';

@Module({
  providers: [SubscriberGateway],
})
export class SubscriberModule {}
