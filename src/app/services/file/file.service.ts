import { Service, FileService as RxdiFileService, BootstrapLogger } from '@rxdi/core';
import { readFile, writeFile } from 'fs';

@Service()
export class FileService {

    constructor(
        private fileService: RxdiFileService,
        private logger: BootstrapLogger
    ) { }

    ensureDir(dir: string) {
        return this.fileService.mkdirp(dir);
    }

    async readFile(file: string): Promise<string> {
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

    private readFilePromisify(file: string): Promise<string>{
        return new Promise((resolve, reject) => {
            readFile(file, 'utf8', (err, data) => {
                if (err) {
                    reject(err);
                }
                resolve(data);
            });
        });
    }

    readFilePromisifyFallback(file: string) {
        return new Promise(async (resolve, reject) => {
            readFile(file, 'utf8', (err, data) => {
                if (err) {
                    this.logger.error('Fallback missing reactive.json file will create one!');
                    return this.writeFile(file, JSON.stringify({
                        name: '',
                        typings: '',
                        module: '',
                        message: '',
                        previews: []
                    }))
                        .then(async () => resolve(await this.readFilePromisify(file)))
                        .catch(e => reject(e));
                }
                return resolve(data);
            });
        });
    }

    private writeFilePromisify(path: string, data: any, encoding: string = 'utf-8'): Promise<boolean> {
        return new Promise((resolve, reject) => {
            writeFile(path, data, { encoding }, (err) => {
                if (err) {
                    reject(err);
                }
                resolve(true);
            });
        });
    }

    readFileRaw(file: string): Promise<Buffer> {
        return new Promise((resolve, reject) => {
            readFile(file, (err, data) => {
                if (err) {
                    reject(err);
                }
                resolve(data);
            });
        });
    }

}