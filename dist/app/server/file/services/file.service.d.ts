export declare class FileService {
    units: string[];
    results: string[];
    private homeDir;
    constructor();
    wholeReadDirRecursive(path?: string): Promise<any[]>;
    readCurrentDirFlat(path?: string): Promise<string[]>;
    listFolder(folder: string): Promise<unknown>;
    readDir(folder: string, limit?: number): Promise<string[]>;
    map(res: any): Promise<unknown[]>;
    private niceBytes;
    statAsync(path: string): Promise<any>;
    moveFile(filePath: string, newPath?: string): import("rxjs").Observable<void>;
    ensureDir(path: string): Promise<unknown>;
    private getFolderFromPath;
    copyTransactionFiles(transactionId: string, repoFolder: string, fileName: string): Promise<void>;
    prepareCopyData(transactionId: string, repoFolder: string, fileName: string): {
        saveFolder: string;
        originalFilePath: string;
        transactionFolder: string;
        filename: string;
        filePath: string;
    };
    removeTransaction(transactionId: string, repoFolder: string, fileName: string): import("rxjs").Observable<unknown>;
    removeFile(path: string): import("rxjs").Observable<void>;
    copyFile(path: string, newPath: string): Promise<void>;
    isFileExist(path: string): Promise<boolean>;
    copyFolderRecursive(source: string, destination: string): Promise<unknown>;
}
