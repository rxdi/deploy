import {
    __FOLDER,
    __IPFS_NODE_RESOLUTION_TIME,
    __FILE_NAME,
    __DEPLOYER_OUTPUT_CONFIG_NAME,
    __NAMESPACE,
    DagModel,
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
import { FileService as CoreFileService } from '../../services/file/file.service';
import { TypescriptDefinitionGeneratorService } from '../../services/dts-generator/dts-generator.service';
import { TsConfigGenratorService } from '../../services/tsconfig-generator/tsconfig-generator.service';
import { TableService } from '../../services/table-service/table-service';
import { BuildHistoryService } from '../../services/build-history/build-history.service';
import { PreviousService } from '../../services/previous/previous.service';
import { ErrorReasonService } from '../../services/error-reason/error-reason.service';
import { StatusService } from '../../status/status.service';
import { PackageJsonService } from '../../services/package-json/package-json.service';
import { includes, nextOrDefault } from '../../services/helpers/helpers';
import { NamespaceService } from '../../server/namespace/services/namespace.service';
import { FileService } from '../../server/file/services/file.service';

@Plugin()
export class CompilePlugin implements PluginInterface {

    @Inject(__FILE_NAME) private fileName: __FILE_NAME;
    @Inject(__FOLDER) private folder: __FOLDER;
    @Inject(__IPFS_NODE_RESOLUTION_TIME) private resolutionTime: __IPFS_NODE_RESOLUTION_TIME;
    @Inject(__DEPLOYER_OUTPUT_CONFIG_NAME) private outputConfigName: __DEPLOYER_OUTPUT_CONFIG_NAME;
    @Inject(__NAMESPACE) private namespace: __NAMESPACE;
    @Inject(__COMMIT_MESSAGE) private commitMessage: __COMMIT_MESSAGE;
    @Inject(__FILE_EXTENSION) private extension: __FILE_EXTENSION;
    fileNotDeployed: string = '';
    initIpfsModule = [{
        size: 0,
        hash: this.fileNotDeployed,
        path: this.fileNotDeployed,
        content: this.fileNotDeployed
    }];
    constructor(
        private parcelBundler: ParcelBundlerService,
        private logger: BootstrapLogger,
        private ipfsFile: FileIpfsService,
        private fileService: CoreFileService,
        private fileUserService: FileUserService,
        private typingsGenerator: TypescriptDefinitionGeneratorService,
        private tsConfigGenerator: TsConfigGenratorService,
        private tableService: TableService,
        private buildHistoryService: BuildHistoryService,
        private previousService: PreviousService,
        private namespaceService: NamespaceService,
        private errorReasonService: ErrorReasonService,
        private statusService: StatusService,
        private packageJsonService: PackageJsonService,
        private internalFileService: FileService
    ) {

    }

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

    parcelBuild(path: string, outDir = null, fileName: string) {
        return this.parcelBundler.prepareBundler(path, outDir, fileName)
    }

    async createCommitMessage(message: string = '') {
        if (includes('--html')) {
            let file;
            const filePath = nextOrDefault('--html', './index.html');
            try {
                file = await this.fileService.readFileRaw(filePath);
            } catch (e) {
                console.log(`
Error loading file ${filePath}
                `);
                process.exit(0);
            }
            return await this.ipfsFile.addRawFile(file);
        } else {
            if (!!message && !message.includes('--') && !message.includes('-')) {
                return await this.ipfsFile.addFile(message);
            } else {
                return await Promise.resolve(this.initIpfsModule);
            }
        }
    }

    completeBuildAndAddToIpfs(
        folder: string,
        file: string,
        message,
        namespace: string,
        outputConfigName: __DEPLOYER_OUTPUT_CONFIG_NAME,
        buildFolder = './build'
    ) {
        let ipfsFile: IPFSFile[];
        let ipfsModule: IPFSFile[];
        let ipfsTypings: IPFSFile[] = this.initIpfsModule;
        let ipfsMessage: IPFSFile[] = this.initIpfsModule;
        let ipfsFileMetadata: IPFSFile[] = this.initIpfsModule;
        let currentModule: DagModel;
        let dag: DagModel;
        this.logger.log('Bundling Started!\n');
        return from(this.parcelBuild(folder + '/' + file, buildFolder, `${file.split('.')[0]}.js`))
            .pipe(
                tap(() => {
                    this.logger.log('Bundling finished!\n');
                    // this.pubsub.publish('CREATE_SIGNAL_BASIC', { message: 'Bundling finished' });
                    this.logger.log(`Adding commit message ${message}...\n`);
                }),
                switchMap(async () => this.createCommitMessage(message)),
                tap(res => {
                    ipfsMessage = res;
                    this.logger.log(`Commit message added...\n`);
                    // this.pubsub.publish('CREATE_SIGNAL_BASIC', { message: 'Commit message added' });
                }),
                switchMap(() => this.fileService.readFile(`${buildFolder}/${file.split('.')[0]}.js`)),
                tap(() => {
                    this.logger.log(`Reading bundle ${buildFolder}/${file.split('.')[0]}.js finished!\n`);
                    // this.pubsub.publish('CREATE_SIGNAL_BASIC', { message: 'Reading bundle finished' });
                }),
                switchMap((res: string) => this.ipfsFile.addFile(res)),
                tap(res => {
                    ipfsFile = res;
                    this.logger.log(`Bundle added to ipfs ${buildFolder}/${file.split('.')[0]}.js\n`);
                    this.logger.log(`Typescript definitions merge started!\n`);
                    // this.pubsub.publish('CREATE_SIGNAL_BASIC', { message: 'Typescript definitions merge starte' });
                }),
                switchMap(() => from(this.typingsGenerator.mergeTypings(namespace, folder, `${buildFolder}/index.d.ts`))),
                tap(() => this.logger.log(`Typescript definitions merge finished! Reading file...\n`)),
                switchMap(() => this.fileService.readFile(`${buildFolder}/index.d.ts`)),
                tap(() => this.logger.log(`Typescript definitions read finished! Adding to IPFS...\n`)),
                switchMap((res: string) => {
                    if (!!res) {
                        return this.ipfsFile.addFile(res);
                    } else {
                        this.statusService.setBuildStatus({
                            typings: {
                                status: 'WARNING',
                                message: 'Missing typescript definition.Typings will not be uploaded!'
                            }
                        });
                        return Promise.resolve(this.initIpfsModule);
                    }
                }),
                tap(res => {
                    ipfsTypings = res;
                    if (ipfsTypings[0].hash) {
                        this.logger.log(`Typescript definitions added to IPFS! Adding module configuration...\n`);
                    }
                }),
                switchMap(() => this.fileService.readFilePromisifyFallback(`${folder}/${outputConfigName}`)),
                switchMap(async (d: string) => {
                    try {
                        dag = JSON.parse(d);
                    } catch (e) {
                        throw new Error(`Cannot parse ${outputConfigName} from root directory!`);
                    }
                    currentModule = {
                        name: namespace,
                        module: ipfsFile[0].hash,
                        createdAt: new Date(),
                    };

                    if (ipfsTypings[0].hash) {
                        currentModule.typings = ipfsTypings[0].hash
                    }

                    if (ipfsMessage[0].hash) {
                        currentModule.message = ipfsMessage[0].hash
                    }

                    if (ipfsFileMetadata[0].hash) {
                        currentModule.metadata = ipfsFileMetadata[0].hash;
                    }
                    // this.pubsub.publish('CREATE_SIGNAL_BASIC', { message: 'Bundldadada' });

                    currentModule.previous = [...(dag.previous || [])];
                    let f: { dependencies?: string[]; ipfs?: { provider: string; dependencies: string[] }[] } = { ipfs: [] };
                    if (await this.internalFileService.statAsync(`${folder}/${outputConfigName}`)) {
                        this.logger.log(`Reactive file present ${outputConfigName} package dependencies will be taken from it`);
                        try {
                            f = JSON.parse(await this.fileService.readFile(`${folder}/${outputConfigName}`));
                        } catch (e) {
                            throw new Error(`Cannot parce reactive file at ${folder}/${outputConfigName}`);
                        }
                        if (f.dependencies) {
                            currentModule.dependencies = f.dependencies;
                        }
                        const dependencies: string[] = [];
                        if (f.ipfs && f.ipfs.length) {
                            f.ipfs.forEach(p => p.dependencies.forEach(d => dependencies.push(d)));
                            if (dependencies.length) {
                                currentModule.dependencies = dependencies;
                            }
                        }
                    }
                    this.logger.log(`Current module before deploy ${JSON.stringify(currentModule)}`);
                    if (includes('--collect-packages')) {
                        const packages = await this.packageJsonService.prepareDependencies(`${folder}/package.json`);
                        if (packages.length) {
                            currentModule.packages = packages;
                        }
                    }
   
                    ipfsModule = await this.ipfsFile.addFile(JSON.stringify(currentModule, null, 2));
                    // this.pubsub.publish('CREATE_SIGNAL_BASIC', { message: 'Module added to ipfs' });

                    if (currentModule.previous.length >= 20) {
                        currentModule.previous.shift();
                    }
                    currentModule.previous = [...currentModule.previous, ipfsModule[0].hash];
                    if (f.ipfs) {
                        currentModule.ipfs = f.ipfs;
                    }
                    await this.fileUserService.writeDag(`${folder}/${outputConfigName}`, JSON.stringify(currentModule, null, 2));
                    // this.pubsub.publish('CREATE_SIGNAL_BASIC', { message: 'Dag written' });
                    // this.integrityCheck(dag, ipfsFile, ipfsTypings);
                    return ipfsModule;
                }),
                tap(() => this.logger.log(`Module configuration added to ipfs!\n`)),
                switchMap(async () => {
                    let nmspc = await this.namespaceService.searchForDuplicates(namespace);
                    if (!nmspc) {
                        nmspc = await this.namespaceService.insert({
                            name: namespace
                        });
                    }
                    return nmspc;
                }),
                switchMap((nmspc) => combineLatest([
                    this.buildHistoryService.insert(<DagModel>{
                        status: {
                            file: this.statusService.getBuildStatus().file,
                            typings: this.statusService.getBuildStatus().typings,
                            module: this.statusService.getBuildStatus().module
                        },
                        hash: ipfsModule[0].hash,
                        name: namespace,
                        typings: ipfsTypings[0].hash,
                        module: ipfsFile[0].hash,
                        metadata: ipfsFileMetadata[0].hash,
                        message: ipfsMessage[0].hash,
                        namespaceId: nmspc['_id']
                    }),
                    this.previousService.insert({
                        name: namespace,
                        hash: ipfsModule[0].hash
                    })
                ])),
                map(() => ({
                    file: ipfsFile,
                    typings: ipfsTypings,
                    module: ipfsModule
                })),
                tap(async () => {
                    // this.pubsub.publish('CREATE_SIGNAL_BASIC', { message: 'Module saved to persisten history!' });

                    this.logger.log('Module saved to persistant history!');
                    if (!ipfsModule) {
                        this.fileNotAddedToIpfs(ipfsModule);
                    }
                    console.log('' + this.tableService.previewsVersions(currentModule.previous));
                    console.log('' + this.tableService.previewsNext(currentModule.previous));
                    console.log('' + this.tableService.endInstallCommand(ipfsModule[0].hash));
                    console.log('' + this.tableService.createTable(ipfsFile, ipfsTypings, ipfsModule));
                    // this.pubsub.publish('CREATE_SIGNAL_BASIC', { message: 'Bundle finished' });
                    // this.pubsub.publish('CREATE_SIGNAL_BASIC', { message: `Ipfs file can be found at ${ipfsModule[0].hash}` });
                    const returnItemByIndex = (i: number) => currentModule.previous[currentModule.previous.length - i];
                    await this.showError(returnItemByIndex(2), returnItemByIndex(1));
                })
            );
    }

    fileNotAddedToIpfs(file: IPFSFile[]) {
        console.log(`File not added to ipfs for ${JSON.stringify(file)}`);
        console.log(`More info can be found executing command: rxdi-deploy --find ${file[0].hash}`);
    }

    integrityCheck(dag: DagModel, file: IPFSFile[], typings: IPFSFile[]) {
        const genericIntegrityError = 'Integrity is same like in the previews version!';
        console.log(dag.module, file[0].hash)
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

    async showError(oldHash, newHash: string) {
        return await new Promise((resolve) => {
            if (Object.keys(this.statusService.getBuildStatus())
                .filter(k => this.statusService.getBuildStatus()[k].status !== 'SUCCESS').length
            ) {
                this.errorReasonService.moduleIntegrityError(oldHash, newHash);
            }
            setTimeout(() => {
                resolve();
            }, 1000)
        })

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