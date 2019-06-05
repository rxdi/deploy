import { TransactionService } from './services/transaction/transaction.service';
import { ITransactionType } from '../../core/api-introspection';
export declare class TransactionsController {
    private transactionSevice;
    constructor(transactionSevice: TransactionService);
    addTransaction(root: any, payload: ITransactionType): Promise<ITransactionType>;
    checkoutTransaction(root: any, payload: ITransactionType): Promise<number>;
    commitTransaction(root: any, payload: ITransactionType): Promise<ITransactionType>;
    pushTransactionMutation(root: any, payload: ITransactionType): Promise<ITransactionType>;
    listTransactions(root: any, { status, repoFolder }: {
        status: any;
        repoFolder: any;
    }): Promise<any[]>;
}
