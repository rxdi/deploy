import { FileService as RxdiFileService } from '@rxdi/core';
export declare class FileService {
    private fileService;
    constructor(fileService: RxdiFileService);
    ensureDir(dir: string): import("rxjs/internal/Observable").Observable<boolean>;
    readFile(file: string): Promise<{}>;
    writeFile(path: string, data: any): Promise<boolean>;
    createFolder(folder: string): Promise<boolean>;
    fileWalker(folder: string): import("rxjs/internal/Observable").Observable<string[]>;
    private readFilePromisify;
    private writeFilePromisify;
}
