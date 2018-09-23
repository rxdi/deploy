import { IPFSFile } from '@gapi/ipfs';
import { HistoryModel } from 'env.injection.tokens';
export declare class TableService {
    table: any;
    private $deploymentStatus;
    createTable(file: IPFSFile[], typings: IPFSFile[], m: IPFSFile[]): any;
    previewsVersions(previewsVersions: string[]): any;
    endInstallCommand(hash: any): any;
    previewsNext(previewsVersions: string[]): any;
    getHistoryTable(history: HistoryModel[]): any;
}
