export declare class FileService {
    units: string[];
    results: string[];
    wholeReadDirRecursive(path?: string): Promise<any[]>;
    readCurrentDirFlat(path?: string): Promise<string[]>;
    listFolder(folder: string): Promise<{}>;
    readDir(folder: string, limit?: number): Promise<string[]>;
    map(res: any): Promise<{}[]>;
    private niceBytes;
    statAsync(path: string): Promise<any>;
}
