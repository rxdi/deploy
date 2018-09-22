import { Service, BootstrapLogger } from '@rxdi/core';
import { FileService } from './file.service';
import { ParcelBundlerService } from '../parcel-bundler/parcel-bundler.service';
import { from, of } from 'rxjs';
import { switchMap, tap } from 'rxjs/operators';
import { FileIpfsService } from '../ipfs-file/ipfs-file.service';
import { IPFSFile } from '@gapi/ipfs';
import { TypescriptDefinitionGeneratorService } from '../dts-generator/dts-generator.service';

@Service()
export class FileUserService {

    defaultBuildDirecctory: string = 'build';
    dag_name: string = 'reactive.json';

    constructor(
        private fileService: FileService,
        private parcelBundler: ParcelBundlerService,
        private ipfsFile: FileIpfsService,
        private typingsGenerator: TypescriptDefinitionGeneratorService,
        private logger: BootstrapLogger
    ) { }

    getTsConfig(filename: string) {
        return `
{
    "compilerOptions": {
        "declaration": true,
        "module": "commonjs",
        "target": "es6",
        "baseUrl": "src",
        "stripInternal": true,
        "emitDecoratorMetadata": true,
        "experimentalDecorators": true,
        "moduleResolution": "node",
        "outDir": ".",
        "lib": [
            "es2017",
            "es2016",
            "es2015",
            "es6",
            "dom",
            "esnext.asynciterable"
        ],
        "skipLibCheck": true,
        "typeRoots": [
            "node_modules/@types"
        ],
    },
    "include": [
        "."
    ],
    "files": [
        "${filename}.ts"
    ]
}`;
    }

    completeBuildAndAddToIpfs(folder: string, file: string, namespace: string, message) {
        let ipfsFile: IPFSFile[];
        let ipfsFileMetadata: IPFSFile[] = [{ hash: '', path: '', size: 0, content: '' }];
        let ipfsTypings: IPFSFile[];
        let ipfsModule: IPFSFile[];
        let ipfsMessage: IPFSFile[] = [{ hash: '', path: '', size: 0, content: '' }];
        this.logger.log('Bundling Started!\n');
        let m;
        return from(this.parcelBundler.prepareBundler(folder + '/' + file, { outDir: this.defaultBuildDirecctory }))
            .pipe(
                tap(() => this.logger.log('Bundling finished!\n')),
                tap(() => this.logger.log(`Adding commit message ${message}...\n`)),
                switchMap(() => this.ipfsFile.addFile(message)),
                tap(res => ipfsMessage = res),
                tap(() => this.logger.log(`Commit message added...\n`)),
                switchMap(() => this.fileService.readFile(`./build/${file.replace('.ts', '')}.js`)),
                tap(() => this.logger.log(`Reading bundle ./build/${file.replace('.ts', '')}.js finished!\n`)),
                switchMap((res: string) => this.ipfsFile.addFile(res)),
                tap(res => ipfsFile = res),
                tap(() => this.logger.log(`Bundle added to ipfs ./build/${file.replace('.ts', '')}.js\n`)),
                // tap(() => this.logger.log(`Typescript definitions merge started!\n`)),
                switchMap(() => from(this.typingsGenerator.mergeTypings(namespace, folder, './build/index.d.ts'))),
                tap(() => this.logger.log(`Typescript definitions merge finished! Reading file...\n`)),
                switchMap(() => this.fileService.readFile(`./build/index.d.ts`)),
                tap(() => this.logger.log(`Typescript definitions read finished! Adding to IPFS...\n`)),
                switchMap((res: string) => this.ipfsFile.addFile(res)),
                tap(res => ipfsTypings = res),
                tap(() => this.logger.log(`Typescript definitions added to IPFS! Adding module configuration...\n`)),
                switchMap(() => this.fileService.readFilePromisifyFallback(`${folder}/${this.dag_name}`)),
                switchMap((d: string) => {
                    const dag = JSON.parse(d);
                    if (dag.module === ipfsFile[0].hash) {
                        throw new Error(`
                    Module is with the same integrity and will not be uploaded again!
                    You need to make change to the module so it will be with different integrity!
                        `);
                    }
                    let iterable = dag.previews || [];
                    m = {
                        name: namespace,
                        typings: ipfsTypings[0].hash,
                        module: ipfsFile[0].hash,
                        metadata: ipfsFileMetadata[0].hash,
                        message: ipfsMessage[0].hash,
                        previews: [...iterable]
                    };
                    return this.ipfsFile.addFile(JSON.stringify(m, null, 4));
                }),
                tap(res => ipfsModule = res),
                tap(() => this.logger.log(`Module configuration added to ipfs!\n`)),
                tap(() => {
                    if (m.previews.length >= 20) {
                        m.previews.shift();
                    }
                    m.previews = [...m.previews, ipfsModule[0].hash];
                    this.writeDag(`${folder}/${this.dag_name}`, JSON.stringify(m, null, 4));
                }),
                switchMap(() => of({
                    file: ipfsFile,
                    typings: ipfsTypings,
                    module: ipfsModule
                }))
            );
    }

    completeBuildAndAddToIpfs2(namespace: string = '@gapi/core') {
        const fileName = 'index';
        const parcelOptions = { outDir: this.defaultBuildDirecctory };
        let ipfsFile: IPFSFile[];
        return from(this.writeFile(`
import { Service } from '@rxdi/core';

@Service()
export class Pesho {
    constructor() {
        console.log('THIS IS PESHO SERVICE');
    }
}
        
        `, fileName + '.ts', namespace))
            .pipe(
                switchMap(() => from(this.writeFile(this.getTsConfig(fileName), 'tsconfig.json', namespace))),
                switchMap(() => from(this.parcelBundler.prepareBundler(`./build/${namespace}/${fileName}.ts`, parcelOptions))),
                switchMap(() => this.fileService.readFile(`./build/${fileName}.js`)),
                switchMap((res: string) => this.ipfsFile.addFile(res)),
                tap(res => ipfsFile = res),
                switchMap(() => from(this.typingsGenerator.mergeTypings(namespace, `./build/${namespace}`, './build/index.d.ts'))),
                switchMap(() => of(ipfsFile))
            );
    }

    async writeFile(file: string, fileName: string, namespace: string) {
        return await new Promise(async (resolve, reject) => {
            this.fileService.ensureDir(`${this.defaultBuildDirecctory}/${namespace}`)
                .subscribe(
                    async () => {
                        await this.fileService.writeFile(`${this.defaultBuildDirecctory}/${namespace}/${fileName}`, file);
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
