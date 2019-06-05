import { ITransactionType } from "../../../../core/api-introspection/index";
import { CompileService } from "../../../services/compile.service";
import { PubSubService } from "@gapi/core";
import { TsConfigGenratorService, LoggerService, FileService as AppFileService } from "../../../..//services";
import { FileService } from "../../../file/services/file.service";
export declare class TransactionService {
    private compileService;
    private pubsub;
    private fileService;
    private appFileService;
    private tsGenerator;
    private loggerService;
    private transaction;
    constructor(compileService: CompileService, pubsub: PubSubService, fileService: FileService, appFileService: AppFileService, tsGenerator: TsConfigGenratorService, loggerService: LoggerService);
    getTransactionById(_id: string): Promise<unknown>;
    getTransactionByPath(path: string, repoFolder: string, payload?: ITransactionType): Promise<unknown>;
    getTransactionByRepo(repoFolder: string, payload?: ITransactionType): Promise<unknown>;
    add(doc: ITransactionType): Promise<ITransactionType>;
    checkout(doc: ITransactionType): Promise<number>;
    update(repoFolder: string, payload: ITransactionType): Promise<number>;
    commit({ repoFolder, message }: ITransactionType): Promise<ITransactionType>;
    private deploy;
    push({ repoFolder }: ITransactionType): Promise<ITransactionType>;
    listTransactions(status: any, repoFolder: string, skip?: number, limit?: number, sort?: {
        createdAt: number;
    }): Promise<any[]>;
}
