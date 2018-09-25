import {
    __FOLDER,
    __IPFS_NODE_RESOLUTION_TIME,
    __FILE_NAME,
    __DEPLOYER_OUTPUT_CONFIG_NAME,
    __NAMESPACE,
    HistoryModel,
    __COMMIT_MESSAGE,
    __FILE_EXTENSION
} from '../../../env.injection.tokens';
import { Inject, BootstrapLogger, PluginInterface, Plugin } from '@rxdi/core';
import { tap, switchMapTo, take, map, switchMap } from 'rxjs/operators';
import { interval, from, of, combineLatest } from 'rxjs';
import { FileUserService } from '../../services/file/file-user.service';
import { IPFSFile } from '@gapi/ipfs';
import { ParcelBundlerService } from '../../services/parcel-bundler/parcel-bundler.service';
import { FileIpfsService } from '../../services/ipfs-file/ipfs-file.service';
import { FileService } from '../../services/file/file.service';
import { TypescriptDefinitionGeneratorService } from '../../services/dts-generator/dts-generator.service';
import { TsConfigGenratorService } from '../../services/tsconfig-generator/tsconfig-generator.service';
import { TableService } from '../../services/table-service/table-service';
import { BuildHistoryService } from '../../services/build-history/build-history.service';
import { PreviwsService } from '../../services/previews/previews.service';
import { ErrorReasonService } from '../../services/error-reason/error-reason.service';
import { StatusService } from '../../status/status.service';
import { includes } from '../../services/arguments/arguments.service';

@Plugin()
export class CompilePlugin implements PluginInterface {

    @Inject(__FILE_NAME) private fileName: __FILE_NAME;
    @Inject(__FOLDER) private folder: __FOLDER;
    @Inject(__IPFS_NODE_RESOLUTION_TIME) private resolutionTime: __IPFS_NODE_RESOLUTION_TIME;
    @Inject(__DEPLOYER_OUTPUT_CONFIG_NAME) private outputConfigName: __DEPLOYER_OUTPUT_CONFIG_NAME;
    @Inject(__NAMESPACE) private namespace: __NAMESPACE;
    @Inject(__COMMIT_MESSAGE) private commitMessage: __COMMIT_MESSAGE;
    @Inject(__FILE_EXTENSION) private extension: __FILE_EXTENSION;

    constructor(
        private parcelBundler: ParcelBundlerService,
        private logger: BootstrapLogger,
        private ipfsFile: FileIpfsService,
        private fileService: FileService,
        private fileUserService: FileUserService,
        private typingsGenerator: TypescriptDefinitionGeneratorService,
        private tsConfigGenerator: TsConfigGenratorService,
        private tableService: TableService,
        private buildHistoryService: BuildHistoryService,
        private previwsService: PreviwsService,
        private errorReasonService: ErrorReasonService,
        private statusService: StatusService
    ) { }

    async register() {
        if (includes('--webui') || includes('--node-only')) {
            return await Promise.resolve();   
        }
        if (this.isJavascriptCompilation()) {
            return await this.compile();
        }
        return await new Promise((resolve) => {
            this.writeOtherFile(`${this.folder}${this.fileName}`)
                .pipe(
                    tap((r) => this.logSuccess(r)),
                    switchMapTo(interval(1000)),
                    take(this.resolutionTime),
                    map(v => (this.resolutionTime - 1) - v)
                )
                .subscribe(
                    (counter) => {
                        if (!counter) {
                            resolve(true);
                            process.exit(0);
                        }
                    },
                    e => {
                        this.logger.error(e);
                        process.exit(1);
                    }
                );
        })
    }

    isJavascriptCompilation() {
        return !!['.ts', '.js'].filter(e => e === this.extension).length;
    }

    async compile() {
        console.log(this.folder, this.fileName, this.commitMessage, this.namespace, this.outputConfigName);
        return this.completeBuildAndAddToIpfs(this.folder, this.fileName, this.commitMessage, this.namespace, this.outputConfigName)
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

    completeBuildAndAddToIpfs(folder: string, file: string, message, namespace: string, outputConfigName: __DEPLOYER_OUTPUT_CONFIG_NAME) {
        let ipfsFile: IPFSFile[];
        let ipfsFileMetadata: IPFSFile[] = [{ hash: '', path: '', size: 0, content: '' }];
        let ipfsTypings: IPFSFile[];
        let ipfsModule: IPFSFile[];
        let ipfsMessage: IPFSFile[] = [{ hash: '', path: '', size: 0, content: '' }];
        this.logger.log('Bundling Started!\n');
        let currentModule;
        let dag: HistoryModel;
        return from(this.parcelBundler.prepareBundler(folder + '/' + file))
            .pipe(
                tap(() => {
                    this.logger.log('Bundling finished!\n');
                    this.logger.log(`Adding commit message ${message}...\n`);
                }),
                switchMap(() => this.ipfsFile.addFile(message)),
                tap(res => {
                    ipfsMessage = res;
                    this.logger.log(`Commit message added...\n`)
                }),
                switchMap(() => this.fileService.readFile(`./build/${file.split('.')[0]}.js`)),
                tap(() => this.logger.log(`Reading bundle ./build/${file.split('.')[0]}.js finished!\n`)),
                switchMap((res: string) => this.ipfsFile.addFile(res)),
                tap(res => {
                    ipfsFile = res;
                    this.logger.log(`Bundle added to ipfs ./build/${file.split('.')[0]}.js\n`);
                    this.logger.log(`Typescript definitions merge started!\n`);
                }),
                switchMap(() => from(this.typingsGenerator.mergeTypings(namespace, folder, './build/index.d.ts'))),
                tap(() => this.logger.log(`Typescript definitions merge finished! Reading file...\n`)),
                switchMap(() => this.fileService.readFile(`./build/index.d.ts`)),
                tap(() => this.logger.log(`Typescript definitions read finished! Adding to IPFS...\n`)),
                switchMap((res: string) => this.ipfsFile.addFile(res)),
                tap(res => {
                    ipfsTypings = res;
                    this.logger.log(`Typescript definitions added to IPFS! Adding module configuration...\n`);
                }),
                switchMap(() => this.fileService.readFilePromisifyFallback(`${folder}/${outputConfigName}`)),
                switchMap(async (d: string) => {
                    try {
                        dag = JSON.parse(d);
                    } catch (e) {
                        throw new Error(`Cannot parse ${outputConfigName} from root directory!`);
                    }
                    currentModule = <HistoryModel>{
                        name: namespace,
                        typings: ipfsTypings[0].hash,
                        module: ipfsFile[0].hash,
                        date: new Date(),
                        metadata: ipfsFileMetadata[0].hash,
                        message: ipfsMessage[0].hash,
                        previews: [...(dag.previews || [])]
                    };
                    ipfsModule = await this.ipfsFile.addFile(JSON.stringify(currentModule, null, 4));
                    if (currentModule.previews.length >= 20) {
                        currentModule.previews.shift();
                    }
                    currentModule.previews = [...currentModule.previews, ipfsModule[0].hash];
                    this.fileUserService.writeDag(`${folder}/${outputConfigName}`, JSON.stringify(currentModule, null, 4));
                    this.integrityCheck(dag, ipfsFile, ipfsTypings);

                    return ipfsModule;
                }),
                tap(() => this.logger.log(`Module configuration added to ipfs!\n`)),
                switchMap(() => combineLatest([
                    this.buildHistoryService.insert(<HistoryModel>{
                        status: {
                            file: this.statusService.getBuildStatus().file,
                            typings: this.statusService.getBuildStatus().typings,
                            module: this.statusService.getBuildStatus().module
                        },
                        hash: ipfsModule[0].hash,
                        name: namespace,
                        date: new Date(),
                        typings: ipfsTypings[0].hash,
                        module: ipfsFile[0].hash,
                        metadata: ipfsFileMetadata[0].hash,
                        message: ipfsMessage[0].hash
                    }),
                    this.previwsService.insert({
                        name: namespace,
                        hash: ipfsModule[0].hash,
                        date: new Date()
                    })
                ])),
                map(() => ({
                    file: ipfsFile,
                    typings: ipfsTypings,
                    module: ipfsModule
                })),
                tap(() => {
                        this.logger.log('Module saved to persistant history!');
                        if (!ipfsModule) {
                            this.fileNotAddedToIpfs(ipfsModule);
                        }
                        console.log('' + this.tableService.previewsVersions(currentModule.previews));
                        console.log('' + this.tableService.previewsNext(currentModule.previews));
                        console.log('' + this.tableService.endInstallCommand(ipfsModule[0].hash));
                        console.log('' + this.tableService.createTable(ipfsFile, ipfsTypings, ipfsModule));
                        this.showError(currentModule.previews[currentModule.previews.length - 2]);
                })
            );
    }

    fileNotAddedToIpfs(file: IPFSFile[]) {
        console.log(`File not added to ipfs for ${JSON.stringify(file)}`);
        console.log(`More info can be found executing command: rxdi-deploy --find ${file[0].hash}`);
    }

    integrityCheck(dag: HistoryModel, file: IPFSFile[], typings: IPFSFile[]) {
        const genericIntegrityError = 'Integrity is same like in the previews version!';
        if (dag.module === file[0].hash) {
            this.logger.log(`
        !! Warning !!
        Module is with the same integrity and will not be uploaded again!
        You need to make change to the module so it will be with different integrity!
            `);
            this.statusService.setBuildStatus({
                file: {
                    status: 'WARNING',
                    message: genericIntegrityError
                },
                module: {
                    status: 'WARNING',
                    message: genericIntegrityError
                }
            });
        }

        if (dag.typings === typings[0].hash) {
            this.logger.log(`
        !! Warning !!
        Typings are with the same integrity and will not be uploaded again!
        You need to make change to the module so it will be with different integrity!
            `);
            this.statusService.setBuildStatus({
                typings: {
                    status: 'WARNING',
                    message: genericIntegrityError
                }
            });
        }

    }

    showError(hash: string) {
        if (Object.keys(this.statusService.getBuildStatus())
            .filter(k => this.statusService.getBuildStatus()[k].status !== 'SUCCESS').length
        ) {
            this.errorReasonService.moduleIntegrityError(hash);
        }
    }

    writeOtherFile(file) {
        return from(this.fileService.readFileRaw(file))
            .pipe(
                switchMap(content => this.ipfsFile.addRawFile(content)),
                tap(c => {
                    console.log('' + this.tableService.fileUploadStatus(c));
                })
            );
    }
    logSuccess(res) {
        // this.logger.log(`Success deploying module! Package added to IPFS: ${JSON.stringify(res, null, 4)}`);
        console.log(`Deploy finish ipfs node will shutdown in: ${this.resolutionTime} seconds`);
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