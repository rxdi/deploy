import { Injectable, Inject } from '@rxdi/core';
import { __TRANSACTIONS_DATABASE } from '../../../../../env.injection.tokens';
import { ITransactionType } from '../../../../core/api-introspection/index';

@Injectable()
export class TransactionService {

    @Inject(__TRANSACTIONS_DATABASE) private transaction: __TRANSACTIONS_DATABASE;

    getTransactionById(_id: string) {
        return new Promise((resolve, reject) => {
            this.transaction.findOne({ _id }, (e, d) => {
                if (e) {
                    reject(e);
                }
                console.log(d);
                resolve(d);
            })
        });
    }

    getTransactionByPath(path: string, repoFolder: string) {
        return new Promise((resolve, reject) => {
            this.transaction.findOne({ path, repoFolder }, (e, d) => {
                if (e) {
                    reject(e);
                }
                resolve(d);
            })
        });
    }

    async insert(doc: ITransactionType): Promise<ITransactionType> {
        const isExist = await this.getTransactionByPath(doc.path, doc.repoFolder) as ITransactionType;
        if (isExist) {
            throw new Error(`File is already added to transaction ${isExist._id}: ${isExist.path}`);
        }
        return await new Promise((resolve, reject) => {
            this.transaction.insert(doc, (e, d) => {
                if (e) {
                    reject(e)
                }
                resolve(d);
            });
        });
    }

    async remove(doc: ITransactionType): Promise<number> {
        const transaction = await this.getTransactionByPath(doc.path, doc.repoFolder) as ITransactionType;
        if (!transaction) {
            throw new Error(`Transaction doesn't exist ${doc.path}`);
        }
        return await new Promise((resolve, reject) => {
            this.transaction.remove(transaction, (e, d) => {
                if (e) {
                    reject(e)
                }
                resolve(d);
            });
        });
    }


    listTransactions(status: any, repoFolder: string, skip: number = 0, limit: number = 100, sort = {createdAt: -1}): Promise<any[]> {
        const find = {} as any;
        if (status !== 'UNKNOWN') {
            find.status = status;
        }
        find.repoFolder = repoFolder;
        console.log(find);
        return new Promise((resolve, reject) => {
            this.transaction
                .find(find)
                .sort(sort)
                .skip(skip)
                .limit(limit)
                .exec((e, d: any) => {
                    if (e) {
                        reject(e);
                    }
                    resolve(d);
                });
        });
    }

}
