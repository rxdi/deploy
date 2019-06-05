/// <reference types="node" />
import { FileService as RxdiFileService, BootstrapLogger } from '@rxdi/core';
export declare class FileService {
    private fileService;
    private logger;
    constructor(fileService: RxdiFileService, logger: BootstrapLogger);
    ensureDir(dir: string): import("rxjs").Observable<boolean>;
    readFile(file: string): Promise<string>;
    writeFile(path: string, data: any): Promise<boolean>;
    createFolder(folder: string): Promise<boolean>;
    fileWalker(folder: string): import("rxjs").Observable<string[]>;
    private readFilePromisify;
    readFilePromisifyFallback(file: string): Promise<unknown>;
    private writeFilePromisify;
    readFileRaw(file: string): Promise<Buffer>;
}
