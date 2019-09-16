import { Injectable, Inject } from '@rxdi/core';
import { __TRANSACTIONS_DATABASE, __HOME_DIR } from '../../../../../env.injection.tokens';
import { ITransactionType } from '../../../../core/api-introspection/index';
import { CompileService } from '../../../services/compile.service';
import { PubSubService } from '@gapi/core';
import { TsConfigGenratorService, LoggerService, FileService as AppFileService } from '../../../..//services';
import { FileService } from '../../../file/services/file.service';
import { format, promisify } from 'util';
import { createWriteStream, exists, readFile, writeFile } from 'fs';
import { Subscription } from 'rxjs';
import { IPFSFile } from '@gapi/ipfs';
import { join } from 'path';

@Injectable()
export class TransactionService {
  @Inject(__TRANSACTIONS_DATABASE) private transaction: __TRANSACTIONS_DATABASE;
  constructor(
    private compileService: CompileService,
    private pubsub: PubSubService,
    private fileService: FileService,
    private appFileService: AppFileService,
    private tsGenerator: TsConfigGenratorService,
    private loggerService: LoggerService
  ) {}
  getTransactionById(_id: string) {
    return new Promise((resolve, reject) => {
      this.transaction.findOne({ _id }, (e, d) => {
        if (e) {
          reject(e);
        }
        console.log(d);
        resolve(d);
      });
    });
  }

  getTransactionByPath(path: string, repoFolder: string, payload?: ITransactionType) {
    return new Promise((resolve, reject) => {
      this.transaction.findOne({ path, repoFolder }, (e, d) => {
        if (e) {
          reject(e);
        }
        resolve(d);
      });
    });
  }

  getTransactionByRepo(repoFolder: string, payload: ITransactionType = {} as any) {
    return new Promise((resolve, reject) => {
      this.transaction.findOne({ repoFolder, ...payload }, (e, d) => {
        if (e) {
          reject(e);
        }
        resolve(d);
      });
    });
  }

  async add(doc: ITransactionType): Promise<ITransactionType> {
    const isExist = (await this.getTransactionByPath(doc.path, doc.repoFolder, {
      status: 'UNKNOWN',
    } as any)) as ITransactionType;
    if (isExist) {
      throw new Error(
        `File is already added to transaction ${isExist._id}: ${isExist.path} and not commited use (rxdi commit "my-message")`
      );
    }
    return await new Promise((resolve, reject) => {
      this.transaction.insert(doc, async (e, d) => {
        if (e) {
          reject(e);
        }
        try {
          await this.fileService.copyTransactionFiles(d._id, d.repoFolder, d.path);
        } catch (e) {
          return reject(e);
        }
        resolve(d);
      });
    });
  }

  async checkout(doc: ITransactionType): Promise<number> {
    const transaction = (await this.getTransactionByPath(doc.path, doc.repoFolder)) as ITransactionType;
    if (!transaction) {
      throw new Error(`Transaction doesn't exist ${doc.path}`);
    }
    await this.fileService.removeTransaction(transaction._id, transaction.repoFolder, transaction.path).toPromise();
    return await new Promise((resolve, reject) => {
      this.transaction.remove(transaction, (e, d) => {
        if (e) {
          reject(e);
        }
        resolve(d);
      });
    });
  }

  async update(repoFolder: string, payload: ITransactionType): Promise<number> {
    return await new Promise((resolve, reject) => {
      this.transaction.update({ repoFolder }, payload, {}, async (e, d) => {
        if (e) {
          reject(e);
        }
        resolve(d);
      });
    });
  }

  async commit({ repoFolder, message }: ITransactionType): Promise<ITransactionType> {
    console.log(repoFolder, message);
    const transaction = (await this.getTransactionByRepo(repoFolder)) as ITransactionType;
    if (!transaction) {
      throw new Error(`Transaction doesn't exist ${repoFolder}`);
    }
    transaction.message = message;
    transaction.status = 'COMMITED';

    const isUpdated = await this.update(repoFolder, transaction);
    if (!isUpdated) {
      throw new Error('Transaction not commited');
    }
    return transaction;
  }

  private deploy(transactionId: string, repoFolder: string, fileName: string, message: string, namespace: string) {
    // const { folder, file, message, namespace, buildFolder } = {} as any;
    const { filename, transactionFolder, filePath } = this.fileService.prepareCopyData(
      transactionId,
      repoFolder,
      fileName
    );
    return new Promise(async (resolve, reject) => {
      await this.appFileService.writeFile(
        filePath + '/tsconfig.json',
        this.tsGenerator.getTsConfig(filename.replace('.ts', ''))
      );
      let packageJson: any = { browserslist: [] };
      if (await promisify(exists)(join(filePath, 'package.json'))) {
        packageJson = JSON.parse(
          await promisify(readFile)(join(filePath, 'package.json'), {
            encoding: 'utf-8',
          })
        );
        if (packageJson.browserslist && packageJson.browserslist.length) {
          const isExistsLatestChrome = packageJson.browserslist.find((item: string) =>
            item.includes('last 1 chrome versions')
          );
          if (!isExistsLatestChrome) {
            packageJson.browserslist.push('last 1 chrome versions');
          }
        } else {
          packageJson.browserslist.push('last 1 chrome versions');
        }
        await promisify(writeFile)(join(filePath, 'package.json'), JSON.stringify(packageJson));
      } else {
        await this.appFileService.writeFile(filePath + '/package.json', this.tsGenerator.getPackageJson());
      }

      const log_file = createWriteStream(`${transactionFolder}/${filename}.log`, { flags: 'w' });
      const subscription = this.loggerService.stdout.subscribe(log => {
        log_file.write(format(log) + '\n');
        this.pubsub.publish('CREATE_SIGNAL_BASIC', { message: format(log) });
      });
      let sub: Subscription;
      const cancelSubscription = () => {
        subscription.unsubscribe();
        log_file.close();
        sub.unsubscribe();
      };
      sub = this.compileService.pushTransaction(transactionFolder, fileName, message, namespace, 'build').subscribe(
        ({ module }: { module: IPFSFile }) => {
          resolve({
            message,
            _id: transactionId,
            hash: module.hash,
          });
          cancelSubscription();
        },
        e => {
          cancelSubscription();
          reject(e || 'Build failed');
        }
      );
    });
  }

  async push({ repoFolder }: ITransactionType): Promise<ITransactionType> {
    const transaction = (await this.getTransactionByRepo(repoFolder, {
      status: 'COMMITED',
    } as any)) as ITransactionType;
    if (!transaction) {
      throw new Error(
        `No commited transactions inside ${repoFolder} \n✎ Maybe you forgot to commit? example: (rxdi commit "my-message")`
      );
    }
    await this.deploy(
      transaction._id,
      transaction.repoFolder,
      transaction.path,
      transaction.message,
      transaction.namespace
    );
    transaction.status = 'DEPLOYED';
    const isUpdated = await this.update(repoFolder, transaction);
    if (!isUpdated) {
      throw new Error('Transaction not commited');
    }
    return transaction;
  }

  listTransactions(
    status: any,
    repoFolder: string,
    skip: number = 0,
    limit: number = 100,
    sort = { createdAt: -1 }
  ): Promise<any[]> {
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
