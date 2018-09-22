import { FileService as RxdiFileService, BootstrapLogger } from '@rxdi/core';
export declare class FileService {
    private fileService;
    private logger;
    constructor(fileService: RxdiFileService, logger: BootstrapLogger);
    ensureDir(dir: string): import("rxjs/internal/Observable").Observable<boolean>;
    readFile(file: string): Promise<{}>;
    writeFile(path: string, data: any): Promise<boolean>;
    createFolder(folder: string): Promise<boolean>;
    fileWalker(folder: string): import("rxjs/internal/Observable").Observable<string[]>;
    private readFilePromisify;
    readFilePromisifyFallback(file: string): Promise<{}>;
    private writeFilePromisify;
}
