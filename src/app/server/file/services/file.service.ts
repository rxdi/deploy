import { Service, FileService as RxdiFileService } from "@rxdi/core";
import { switchMap } from "rxjs/operators";
import { stat, Stats } from "fs";

@Service()
export class FileService {
    units = ['bytes', 'KB', 'MB', 'GB', 'TB', 'PB', 'EB', 'ZB', 'YB'];

    constructor(
        private fileService: RxdiFileService
    ) { }

    async listFolder(folder: string) {
        return await new Promise((resolve, reject) => {
            this.fileService.fileWalker(folder)
                .pipe(
                    switchMap((res) => this.map(res))
                )
                .subscribe(structure => resolve(structure), e => reject(e));
        });
    }

    async map(res) {
        return await Promise.all(res.map(async (r) => {
            const mapping = {
                path: r,
                directory: null,
                file: null,
                name: null,
                status: null
            };
            const status: Stats = await this.statAsync(r);
            if (status.isDirectory()) {
                mapping.directory = true;
            } else {
                mapping.file = true;
            }
            mapping.name = r.split("/").pop();
            mapping.path = r.replace(process.cwd(), '.');
            mapping.status = status;
            mapping.status.size = this.niceBytes(status.size);
            return mapping;
        }));
    }

    private niceBytes(x) {
        let l = 0, n = parseInt(x, 10) || 0;
        while(n >= 1024 && ++l)
            n = n/1024;
        return(n.toFixed(n >= 10 || l < 1 ? 0 : 1) + ' ' + this.units[l]);
    }

    async statAsync(path: string): Promise<any> {
        return await new Promise((resolve, reject) => {
            stat(path, (e, stats) => {
                if (e) {
                    reject(e);
                }
                resolve(stats);
            })
        });
    }

}
