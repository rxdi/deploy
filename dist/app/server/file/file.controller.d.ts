import { FileService as InternalFileService } from './services/file.service';
import { FileService } from '../../services/file/file.service';
export declare class FileController {
    private fileServiceInternal;
    private fileService;
    constructor(fileServiceInternal: InternalFileService, fileService: FileService);
    listFiles(root: any, { folder }: {
        folder: any;
    }): Promise<{
        paths: {};
    }>;
    readFile(root: any, { folder }: {
        folder: string;
    }): Promise<{
        package: any;
        file: string;
    }>;
    saveFile(root: any, { folder, content }: {
        folder: any;
        content: any;
    }): Promise<{
        file: string;
    }>;
}
