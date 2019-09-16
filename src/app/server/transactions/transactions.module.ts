import { Module } from '@gapi/core';
import { TransactionsController } from './transactions.controller';
import { TransactionService } from './services/transaction/transaction.service';

@Module({
  controllers: [TransactionsController],
  providers: [TransactionService],
})
export class TransactionsModule {}
