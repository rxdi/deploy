import {
  Controller,
  GraphQLControllerOptions,
  Query,
  Mutation,
  Type,
  GraphQLList,
  GraphQLNonNull,
  GraphQLString,
} from '@gapi/core';
import { TransactionType } from './types/transaction.type';
import { TransactionService } from './services/transaction/transaction.service';
import { TransactionTypeEnum } from './types/transaction-enum.type';
import { ITransactionType } from '../../core/api-introspection';

@Controller<GraphQLControllerOptions>({
  guards: [],
  type: TransactionType,
})
export class TransactionsController {
  constructor(private transactionSevice: TransactionService) {}

  @Mutation({
    path: {
      type: new GraphQLNonNull(GraphQLString),
    },
    birthtime: {
      type: new GraphQLNonNull(GraphQLString),
    },
    repoFolder: {
      type: new GraphQLNonNull(GraphQLString),
    },
    namespace: {
      type: new GraphQLNonNull(GraphQLString),
    },
  })
  addTransaction(root, payload: ITransactionType) {
    return this.transactionSevice.add({ ...payload, status: 'UNKNOWN' });
  }

  @Mutation({
    path: {
      type: new GraphQLNonNull(GraphQLString),
    },
    repoFolder: {
      type: new GraphQLNonNull(GraphQLString),
    },
  })
  checkoutTransaction(root, payload: ITransactionType) {
    return this.transactionSevice.checkout(payload);
  }

  @Mutation({
    message: {
      type: new GraphQLNonNull(GraphQLString),
    },
    repoFolder: {
      type: new GraphQLNonNull(GraphQLString),
    },
  })
  commitTransaction(root, payload: ITransactionType) {
    return this.transactionSevice.commit(payload);
  }

  @Mutation({
    repoFolder: {
      type: new GraphQLNonNull(GraphQLString),
    },
  })
  pushTransactionMutation(root, payload: ITransactionType) {
    return this.transactionSevice.push(payload);
  }

  @Type(new GraphQLList(TransactionType))
  @Query({
    status: {
      type: TransactionTypeEnum,
    },
    repoFolder: {
      type: new GraphQLNonNull(GraphQLString),
    },
  })
  listTransactions(root, { status, repoFolder }) {
    return this.transactionSevice.listTransactions(status, repoFolder);
  }
}
