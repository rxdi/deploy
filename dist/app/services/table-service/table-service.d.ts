import { IPFSFile } from '@gapi/ipfs';
import { FileIpfsService } from '../ipfs-file/ipfs-file.service';
import { DagModel } from '../../../env.injection.tokens';
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
    getHistoryTable(history: DagModel[]): any;
    fileUploadStatus(file: IPFSFile[]): any;
}
