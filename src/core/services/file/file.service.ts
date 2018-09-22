import { Service, FileService as RxdiFileService } from '@rxdi/core';
import { readFile, writeFile } from 'fs';

@Service()
export class FileService {

    constructor(
        private fileService: RxdiFileService
    ) { }

    ensureDir(dir: string) {
        return this.fileService.mkdirp(dir);
    }

    async readFile(file: string) {
        return await this.readFilePromisify(file);
    }

    async writeFile(path: string, data: any) {
        return await this.writeFilePromisify(path, data);
    }

    async createFolder(folder: string) {
        return await this.fileService.mkdirp(folder).toPromise();
    }

    fileWalker(folder: string) {
        return this.fileService.fileWalker(folder);
    }

    private readFilePromisify(file: string) {
        return new Promise((resolve, reject) => {
            readFile(file, 'utf8', (err, data) => {
                if (err) {
                    reject(err);
                }
                resolve(data);
            });
        });
    }

    private writeFilePromisify(path: string, data: any): Promise<boolean> {
        return new Promise((resolve, reject) => {
            writeFile(path, data, (err) => {
                if (err) {
                    reject(err);
                }
                resolve(true);
            });
        });
    }

}