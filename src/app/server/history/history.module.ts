import { Module } from '@rxdi/core';
import { HistorySubscriptionController } from './history-subscription.controller';

@Module({
  controllers: [HistorySubscriptionController],
})
export class HistoryModule {}
