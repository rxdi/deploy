import {
    __DEPLOYER_ARGUMENTS,
    __GENERATE_TS_CONFIG,
    __FILE_PATH,
    __FOLDER,
    __IPFS_NODE_RESOLUTION_TIME,
    __FILE_NAME,
    __DEPLOYER_OUTPUT_CONFIG_NAME,
    __NAMESPACE
} from '../../../env.injection.tokens';
import { Plugin, Inject, BootstrapLogger } from '@rxdi/core';
import { tap, switchMapTo, take, map, switchMap } from 'rxjs/operators';
import { interval, from, of } from 'rxjs';
import { FileUserService } from '../file/file-user.service';
import { IPFSFile } from '@gapi/ipfs';
import { ParcelBundlerService } from '../parcel-bundler/parcel-bundler.service';
import { FileIpfsService } from '../ipfs-file/ipfs-file.service';
import { FileService } from '../file/file.service';
import { TypescriptDefinitionGeneratorService } from '../dts-generator/dts-generator.service';
import { TsConfigGenratorService } from '../tsconfig-generator/tsconfig-generator.service';
import { FILE_DEPLOYMENT_STATUS } from '../../status/status-injection.tokens';
import { TableService } from '../table-service/table-service';

var Table = require("terminal-table");

@Plugin()
export class CompileService {

    @Inject(__DEPLOYER_ARGUMENTS) private args: __DEPLOYER_ARGUMENTS;
    @Inject(__FILE_NAME) private fileName: __FILE_NAME;
    @Inject(__FOLDER) private folder: __FOLDER;
    @Inject(__IPFS_NODE_RESOLUTION_TIME) private resolutionTime: __IPFS_NODE_RESOLUTION_TIME;
    @Inject(__DEPLOYER_OUTPUT_CONFIG_NAME) private outputConfigName: __DEPLOYER_OUTPUT_CONFIG_NAME;
    @Inject(__NAMESPACE) private namespace: __NAMESPACE;
    @Inject(FILE_DEPLOYMENT_STATUS) private $file_deployment_status: FILE_DEPLOYMENT_STATUS;

    constructor(
        private parcelBundler: ParcelBundlerService,
        private logger: BootstrapLogger,
        private ipfsFile: FileIpfsService,
        private fileService: FileService,
        private fileUserService: FileUserService,
        private typingsGenerator: TypescriptDefinitionGeneratorService,
        private tsConfigGenerator: TsConfigGenratorService,
        private tableService: TableService
    ) { }

    async register() {
        this.compile();
    }

    async compile() {
        return this.completeBuildAndAddToIpfs(this.folder, this.fileName, this.args[2])
            .pipe(
                tap((r) => this.logSuccess(r)),
                switchMapTo(interval(1000)),
                take(this.resolutionTime),
                map(v => (this.resolutionTime - 1) - v)
            )
            .subscribe(
                (counter) => {
                    if (!counter) {
                        process.exit(0);
                    }
                },
                e => {
                    this.logger.error(e);
                    process.exit(1);
                }
            );
    }

    completeBuildAndAddToIpfs(folder: string, file: string, message) {
        let ipfsFile: IPFSFile[];
        let ipfsFileMetadata: IPFSFile[] = [{ hash: '', path: '', size: 0, content: '' }];
        let ipfsTypings: IPFSFile[];
        let ipfsModule: IPFSFile[];
        let ipfsMessage: IPFSFile[] = [{ hash: '', path: '', size: 0, content: '' }];
        this.logger.log('Bundling Started!\n');
        let m;
        return from(this.parcelBundler.prepareBundler(folder + '/' + file))
            .pipe(
                tap(() => this.logger.log('Bundling finished!\n')),
                tap(() => this.logger.log(`Adding commit message ${message}...\n`)),
                switchMap(() => this.ipfsFile.addFile(message)),
                tap(res => ipfsMessage = res),
                tap(() => this.logger.log(`Commit message added...\n`)),
                switchMap(() => this.fileService.readFile(`./build/${file.split('.')[0]}.js`)),
                tap(() => this.logger.log(`Reading bundle ./build/${file.split('.')[0]}.js finished!\n`)),
                switchMap((res: string) => this.ipfsFile.addFile(res)),
                tap(res => ipfsFile = res),
                tap(() => this.logger.log(`Bundle added to ipfs ./build/${file.split('.')[0]}.js\n`)),
                // tap(() => this.logger.log(`Typescript definitions merge started!\n`)),
                switchMap(() => from(this.typingsGenerator.mergeTypings(this.namespace, folder, './build/index.d.ts'))),
                tap(() => this.logger.log(`Typescript definitions merge finished! Reading file...\n`)),
                switchMap(() => this.fileService.readFile(`./build/index.d.ts`)),
                tap(() => this.logger.log(`Typescript definitions read finished! Adding to IPFS...\n`)),
                switchMap((res: string) => this.ipfsFile.addFile(res)),
                tap(res => ipfsTypings = res),
                tap(() => this.logger.log(`Typescript definitions added to IPFS! Adding module configuration...\n`)),
                switchMap(() => this.fileService.readFilePromisifyFallback(`${folder}/${this.outputConfigName}`)),
                switchMap(async (d: string) => {
                    const dag = JSON.parse(d);
                    m = dag;
                    if (dag.module === ipfsFile[0].hash) {
                        ipfsModule = await this.ipfsFile.addFile(JSON.stringify(dag, null, 4));
        
                        this.logger.log(`
                    !! Warning !!
                    Module is with the same integrity and will not be uploaded again!
                    You need to make change to the module so it will be with different integrity!
                        `);
                        this.$file_deployment_status.next({
                            ...this.$file_deployment_status.getValue(),
                            file: false,
                            module: false
                        })
                    } else {
                        let iterable = dag.previews || [];
                        m = {
                            name: this.namespace,
                            typings: ipfsTypings[0].hash,
                            module: ipfsFile[0].hash,
                            metadata: ipfsFileMetadata[0].hash,
                            message: ipfsMessage[0].hash,
                            previews: [...iterable]
                        };
                        ipfsModule = await this.ipfsFile.addFile(JSON.stringify(m, null, 4));
                        if (m.previews.length >= 20) {
                            m.previews.shift();
                        }
                        m.previews = [...m.previews, ipfsModule[0].hash];
                        this.fileUserService.writeDag(`${folder}/${this.outputConfigName}`, JSON.stringify(m, null, 4));
                        return ipfsModule;
                    }

                    if (dag.typings === ipfsTypings[0].hash) {
                        this.logger.log(`
                    !! Warning !!
                    Typings are with the same integrity and will not be uploaded again!
                    You need to make change to the module so it will be with different integrity!
                        `);
                        this.$file_deployment_status.next({
                            ...this.$file_deployment_status.getValue(),
                            typings: false
                        })
                    }
                    return of(dag);

                }),
                tap(() => this.logger.log(`Module configuration added to ipfs!\n`)),
                switchMap(() => of({
                    file: ipfsFile,
                    typings: ipfsTypings,
                    module: ipfsModule
                })),
                tap(() => {
                    console.log("" + this.tableService.createTable(ipfsFile, ipfsTypings, ipfsModule));
                    console.log("" + this.tableService.previewsVersions(m.previews));
                })
            );
    }


    logSuccess(res) {
        // this.logger.log(`Success deploying module! Package added to IPFS: ${JSON.stringify(res, null, 4)}`);
        this.logger.log(`Module deploy finish ipfs node will shitdown in: ${this.resolutionTime} seconds`);
    }

    completeBuildAndAddToIpfs2(namespace: string = '@gapi/core') {
        const fileName = 'index';
        let ipfsFile: IPFSFile[];
        return from(this.fileUserService.writeFile(`
import { Service } from '@rxdi/core';

@Service()
export class Pesho {
    constructor() {
        console.log('THIS IS PESHO SERVICE');
    }
}
        
        `, fileName + '.ts', namespace))
            .pipe(
                switchMap(() => from(this.fileUserService.writeFile(this.tsConfigGenerator.getTsConfig(fileName), 'tsconfig.json', namespace))),
                switchMap(() => from(this.parcelBundler.prepareBundler(`./build/${namespace}/${fileName}.ts`))),
                switchMap(() => this.fileService.readFile(`./build/${fileName}.js`)),
                switchMap((res: string) => this.ipfsFile.addFile(res)),
                tap(res => ipfsFile = res),
                switchMap(() => from(this.typingsGenerator.mergeTypings(namespace, `./build/${namespace}`, './build/index.d.ts'))),
                switchMap(() => of(ipfsFile))
            );
    }


}