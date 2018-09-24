import { IPFSFile } from '@gapi/ipfs';
import { HistoryModel } from 'env.injection.tokens';
import { FileIpfsService } from '../ipfs-file/ipfs-file.service';
export declare class TableService {
    private fileIpfsService;
    private $deploymentStatus;
    constructor(fileIpfsService: FileIpfsService);
    createGenericTableStatus(ModuleStatus: any): {
        Icon: any;
        Color: any;
    };
    createTable(file: IPFSFile[], typings: IPFSFile[], m: IPFSFile[]): any;
    previewsVersions(previewsVersions: string[]): any;
    endInstallCommand(hash: any): any;
    previewsNext(previewsVersions: string[]): any;
    getHistoryTable(history: HistoryModel[]): any;
    fileUploadStatus(file: IPFSFile[]): any;
}
