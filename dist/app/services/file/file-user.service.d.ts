import { FileService } from './file.service';
export declare class FileUserService {
    private fileService;
    private parcelBuildDir;
    constructor(fileService: FileService);
    writeFile(file: string, fileName: string, namespace: string): Promise<{}>;
    writeDag(path: string, file: string): Promise<{}>;
}
