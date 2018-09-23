import { Service, Inject } from '@rxdi/core';
import { FileService } from './file.service';
import {
    __PARCEL_BUILD_OUT_DIR,
    __NAMESPACE,
    __DEPLOYER_OUTPUT_CONFIG_NAME
} from '../../../env.injection.tokens';

@Service()
export class FileUserService {

    @Inject(__PARCEL_BUILD_OUT_DIR) private parcelBuildDir: __PARCEL_BUILD_OUT_DIR;

    constructor(
        private fileService: FileService
    ) { }

    async writeFile(file: string, fileName: string, namespace: string) {
        return await new Promise(async (resolve, reject) => {
            this.fileService.ensureDir(`${this.parcelBuildDir}/${namespace}`)
                .subscribe(
                    async () => {
                        await this.fileService.writeFile(`${this.parcelBuildDir}/${namespace}/${fileName}`, file);
                        resolve(true);
                    },
                    e => reject(e)
                );
        });
    }

    async writeDag(path: string, file: string) {
        return await new Promise(async (resolve, reject) => {
            await this.fileService.writeFile(path, file);
            resolve(true);
        });
    }

}
