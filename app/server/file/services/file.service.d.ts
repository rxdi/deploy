import { FileService as RxdiFileService } from "@rxdi/core";
export declare class FileService {
    private fileService;
    units: string[];
    constructor(fileService: RxdiFileService);
    listFolder(folder: string): Promise<{}>;
    map(res: any): Promise<[{}, {}, {}, {}, {}, {}, {}, {}, {}, {}]>;
    private niceBytes;
    statAsync(path: string): Promise<any>;
}
