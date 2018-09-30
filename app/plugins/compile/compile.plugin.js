"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : new P(function (resolve) { resolve(result.value); }).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
const env_injection_tokens_1 = require("../../../env.injection.tokens");
const core_1 = require("@rxdi/core");
const operators_1 = require("rxjs/operators");
const rxjs_1 = require("rxjs");
const file_user_service_1 = require("../../services/file/file-user.service");
const parcel_bundler_service_1 = require("../../services/parcel-bundler/parcel-bundler.service");
const ipfs_file_service_1 = require("../../services/ipfs-file/ipfs-file.service");
const file_service_1 = require("../../services/file/file.service");
const dts_generator_service_1 = require("../../services/dts-generator/dts-generator.service");
const tsconfig_generator_service_1 = require("../../services/tsconfig-generator/tsconfig-generator.service");
const table_service_1 = require("../../services/table-service/table-service");
const build_history_service_1 = require("../../services/build-history/build-history.service");
const previous_service_1 = require("../../services/previous/previous.service");
const error_reason_service_1 = require("../../services/error-reason/error-reason.service");
const status_service_1 = require("../../status/status.service");
const package_json_service_1 = require("../../services/package-json/package-json.service");
const helpers_1 = require("../../services/helpers/helpers");
const core_2 = require("@gapi/core");
const namespace_service_1 = require("../../server/namespace/services/namespace.service");
let CompilePlugin = class CompilePlugin {
    constructor(parcelBundler, logger, ipfsFile, fileService, fileUserService, typingsGenerator, tsConfigGenerator, tableService, buildHistoryService, previousService, namespaceService, errorReasonService, statusService, packageJsonService, rxdiFileService, pubsub) {
        this.parcelBundler = parcelBundler;
        this.logger = logger;
        this.ipfsFile = ipfsFile;
        this.fileService = fileService;
        this.fileUserService = fileUserService;
        this.typingsGenerator = typingsGenerator;
        this.tsConfigGenerator = tsConfigGenerator;
        this.tableService = tableService;
        this.buildHistoryService = buildHistoryService;
        this.previousService = previousService;
        this.namespaceService = namespaceService;
        this.errorReasonService = errorReasonService;
        this.statusService = statusService;
        this.packageJsonService = packageJsonService;
        this.rxdiFileService = rxdiFileService;
        this.pubsub = pubsub;
        this.fileNotDeployed = '';
        this.initIpfsModule = [{
                size: 0,
                hash: this.fileNotDeployed,
                path: this.fileNotDeployed,
                content: this.fileNotDeployed
            }];
    }
    register() {
        return __awaiter(this, void 0, void 0, function* () {
            if (helpers_1.includes('--webui') || helpers_1.includes('--node-only')) {
                return yield Promise.resolve();
            }
            if (this.isJavascriptCompilation()) {
                return yield this.compile();
            }
            return yield new Promise((resolve) => {
                this.writeOtherFile(`${this.folder}${this.fileName}`)
                    .pipe(operators_1.tap((r) => this.logSuccess(r)), operators_1.switchMapTo(rxjs_1.interval(1000)), operators_1.take(this.resolutionTime), operators_1.map(v => (this.resolutionTime - 1) - v))
                    .subscribe((counter) => {
                    if (!counter) {
                        resolve(true);
                        process.exit(0);
                    }
                }, e => {
                    this.logger.error(e);
                    process.exit(1);
                });
            });
        });
    }
    isJavascriptCompilation() {
        return !!['.ts', '.js'].filter(e => e === this.extension).length;
    }
    compile() {
        return __awaiter(this, void 0, void 0, function* () {
            return this.completeBuildAndAddToIpfs(this.folder, this.fileName, this.commitMessage, this.namespace, this.outputConfigName)
                .pipe(operators_1.tap((r) => this.logSuccess(r)), operators_1.switchMapTo(rxjs_1.interval(1000)), operators_1.take(this.resolutionTime), operators_1.map(v => (this.resolutionTime - 1) - v))
                .subscribe((counter) => {
                if (!counter) {
                    process.exit(0);
                }
            }, e => {
                this.logger.error(e);
                process.exit(1);
            });
        });
    }
    parcelBuild(path, outDir = null) {
        return __awaiter(this, void 0, void 0, function* () {
            return this.parcelBundler.prepareBundler(path, outDir);
        });
    }
    createCommitMessage(message = '') {
        return __awaiter(this, void 0, void 0, function* () {
            if (helpers_1.includes('--html')) {
                let file;
                const filePath = helpers_1.nextOrDefault('--html', './index.html');
                try {
                    file = yield this.fileService.readFileRaw(filePath);
                }
                catch (e) {
                    console.log(`
Error loading file ${filePath}
                `);
                    process.exit(0);
                }
                return yield this.ipfsFile.addRawFile(file);
            }
            else {
                if (!!message && !message.includes('--') && !message.includes('-')) {
                    return yield this.ipfsFile.addFile(message);
                }
                else {
                    return yield Promise.resolve(this.initIpfsModule);
                }
            }
        });
    }
    completeBuildAndAddToIpfs(folder, file, message, namespace, outputConfigName, buildFolder = './build') {
        let ipfsFile;
        let ipfsModule;
        let ipfsTypings = this.initIpfsModule;
        let ipfsMessage = this.initIpfsModule;
        let ipfsFileMetadata = this.initIpfsModule;
        let currentModule;
        let dag;
        this.logger.log('Bundling Started!\n');
        return rxjs_1.from(this.parcelBuild(folder + '/' + file, buildFolder))
            .pipe(operators_1.tap(() => {
            this.logger.log('Bundling finished!\n');
            this.pubsub.publish('CREATE_SIGNAL_BASIC', { message: 'Bundling finished' });
            this.logger.log(`Adding commit message ${message}...\n`);
        }), operators_1.switchMap(() => __awaiter(this, void 0, void 0, function* () { return this.createCommitMessage(message); })), operators_1.tap(res => {
            ipfsMessage = res;
            this.logger.log(`Commit message added...\n`);
            this.pubsub.publish('CREATE_SIGNAL_BASIC', { message: 'Commit message added' });
        }), operators_1.switchMap(() => this.fileService.readFile(`${buildFolder}/${file.split('.')[0]}.js`)), operators_1.tap(() => {
            this.logger.log(`Reading bundle ${buildFolder}/${file.split('.')[0]}.js finished!\n`);
            this.pubsub.publish('CREATE_SIGNAL_BASIC', { message: 'Reading bundle finished' });
        }), operators_1.switchMap((res) => this.ipfsFile.addFile(res)), operators_1.tap(res => {
            ipfsFile = res;
            this.logger.log(`Bundle added to ipfs ${buildFolder}/${file.split('.')[0]}.js\n`);
            this.logger.log(`Typescript definitions merge started!\n`);
            this.pubsub.publish('CREATE_SIGNAL_BASIC', { message: 'Typescript definitions merge starte' });
        }), operators_1.switchMap(() => rxjs_1.from(this.typingsGenerator.mergeTypings(namespace, folder, `${buildFolder}/index.d.ts`))), operators_1.tap(() => this.logger.log(`Typescript definitions merge finished! Reading file...\n`)), operators_1.switchMap(() => this.fileService.readFile(`${buildFolder}/index.d.ts`)), operators_1.tap(() => this.logger.log(`Typescript definitions read finished! Adding to IPFS...\n`)), operators_1.switchMap((res) => {
            if (!!res) {
                return this.ipfsFile.addFile(res);
            }
            else {
                this.statusService.setBuildStatus({
                    typings: {
                        status: 'WARNING',
                        message: 'Missing typescript definition.Typings will not be uploaded!'
                    }
                });
                return Promise.resolve(this.initIpfsModule);
            }
        }), operators_1.tap(res => {
            ipfsTypings = res;
            if (ipfsTypings[0].hash) {
                this.logger.log(`Typescript definitions added to IPFS! Adding module configuration...\n`);
            }
        }), operators_1.switchMap(() => this.fileService.readFilePromisifyFallback(`${folder}/${outputConfigName}`)), operators_1.switchMap((d) => __awaiter(this, void 0, void 0, function* () {
            try {
                dag = JSON.parse(d);
            }
            catch (e) {
                throw new Error(`Cannot parse ${outputConfigName} from root directory!`);
            }
            currentModule = {
                name: namespace,
                module: ipfsFile[0].hash,
                date: new Date(),
            };
            if (ipfsTypings[0].hash) {
                currentModule.typings = ipfsTypings[0].hash;
            }
            if (ipfsMessage[0].hash) {
                currentModule.message = ipfsMessage[0].hash;
            }
            if (ipfsFileMetadata[0].hash) {
                currentModule.metadata = ipfsFileMetadata[0].hash;
            }
            this.pubsub.publish('CREATE_SIGNAL_BASIC', { message: 'Bundldadada' });
            currentModule.previous = [...(dag.previous || [])];
            let f = { ipfs: [] };
            if (this.rxdiFileService.isPresent(`./${outputConfigName}`)) {
                this.logger.log(`Reactive file present ${outputConfigName} package dependencies will be taken from it`);
                try {
                    f = JSON.parse(yield this.fileService.readFile(`./${outputConfigName}`));
                }
                catch (e) {
                    throw new Error(`Cannot parce reactive file at ./${outputConfigName}`);
                }
                if (f.dependencies) {
                    currentModule.dependencies = f.dependencies;
                }
                const dependencies = [];
                if (f.ipfs && f.ipfs.length) {
                    f.ipfs.forEach(p => p.dependencies.forEach(d => dependencies.push(d)));
                    if (dependencies.length) {
                        currentModule.dependencies = dependencies;
                    }
                }
            }
            this.logger.log(`Current module before deploy ${JSON.stringify(currentModule)}`);
            const packages = yield this.packageJsonService.prepareDependencies();
            if (packages.length && !helpers_1.includes('--disable-package-collection')) {
                currentModule.packages = packages;
            }
            ipfsModule = yield this.ipfsFile.addFile(JSON.stringify(currentModule, null, 2));
            this.pubsub.publish('CREATE_SIGNAL_BASIC', { message: 'Module added to ipfs' });
            if (currentModule.previous.length >= 20) {
                currentModule.previous.shift();
            }
            currentModule.previous = [...currentModule.previous, ipfsModule[0].hash];
            if (f.ipfs) {
                currentModule.ipfs = f.ipfs;
            }
            delete currentModule.dependencies;
            yield this.fileUserService.writeDag(`${folder}/${outputConfigName}`, JSON.stringify(currentModule, null, 2));
            this.pubsub.publish('CREATE_SIGNAL_BASIC', { message: 'Dag written' });
            this.integrityCheck(dag, ipfsFile, ipfsTypings);
            return ipfsModule;
        })), operators_1.tap(() => this.logger.log(`Module configuration added to ipfs!\n`)), operators_1.switchMap(() => __awaiter(this, void 0, void 0, function* () {
            let nmspc = yield this.namespaceService.searchForDuplicates(namespace);
            if (!nmspc) {
                nmspc = yield this.namespaceService.insert({
                    name: namespace
                });
            }
            return nmspc;
        })), operators_1.switchMap((nmspc) => rxjs_1.combineLatest([
            this.buildHistoryService.insert({
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
                message: ipfsMessage[0].hash,
                namespaceId: nmspc['_id']
            }),
            this.previousService.insert({
                name: namespace,
                hash: ipfsModule[0].hash,
                date: new Date()
            })
        ])), operators_1.map(() => ({
            file: ipfsFile,
            typings: ipfsTypings,
            module: ipfsModule
        })), operators_1.tap(() => {
            this.pubsub.publish('CREATE_SIGNAL_BASIC', { message: 'Module saved to persisten history!' });
            this.logger.log('Module saved to persistant history!');
            if (!ipfsModule) {
                this.fileNotAddedToIpfs(ipfsModule);
            }
            console.log('' + this.tableService.previewsVersions(currentModule.previous));
            console.log('' + this.tableService.previewsNext(currentModule.previous));
            console.log('' + this.tableService.endInstallCommand(ipfsModule[0].hash));
            console.log('' + this.tableService.createTable(ipfsFile, ipfsTypings, ipfsModule));
            this.pubsub.publish('CREATE_SIGNAL_BASIC', { message: 'Bundle finished' });
            this.pubsub.publish('CREATE_SIGNAL_BASIC', { message: `Ipfs file can be found at ${ipfsModule[0].hash}` });
            this.showError(currentModule.previous[currentModule.previous.length - 2]);
        }));
    }
    fileNotAddedToIpfs(file) {
        console.log(`File not added to ipfs for ${JSON.stringify(file)}`);
        console.log(`More info can be found executing command: rxdi-deploy --find ${file[0].hash}`);
    }
    integrityCheck(dag, file, typings) {
        const genericIntegrityError = 'Integrity is same like in the previews version!';
        console.log(dag.module, file[0].hash);
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
    showError(hash) {
        if (Object.keys(this.statusService.getBuildStatus())
            .filter(k => this.statusService.getBuildStatus()[k].status !== 'SUCCESS').length) {
            this.errorReasonService.moduleIntegrityError(hash);
        }
    }
    writeOtherFile(file) {
        return rxjs_1.from(this.fileService.readFileRaw(file))
            .pipe(operators_1.switchMap(content => this.ipfsFile.addRawFile(content)), operators_1.tap(c => {
            console.log('' + this.tableService.fileUploadStatus(c));
        }));
    }
    logSuccess(res) {
        console.log(`Deploy finish ipfs node will shutdown in: ${this.resolutionTime} seconds`);
    }
    completeBuildAndAddToIpfs2(namespace = '@gapi/core') {
        const fileName = 'index';
        let ipfsFile;
        return rxjs_1.from(this.fileUserService.writeFile(`
import { Service } from '@rxdi/core';

@Service()
export class Pesho {
    constructor() {
        console.log('THIS IS PESHO SERVICE');
    }
}
        
        `, fileName + '.ts', namespace))
            .pipe(operators_1.switchMap(() => rxjs_1.from(this.fileUserService.writeFile(this.tsConfigGenerator.getTsConfig(fileName), 'tsconfig.json', namespace))), operators_1.switchMap(() => rxjs_1.from(this.parcelBundler.prepareBundler(`./build/${namespace}/${fileName}.ts`))), operators_1.switchMap(() => this.fileService.readFile(`./build/${fileName}.js`)), operators_1.switchMap((res) => this.ipfsFile.addFile(res)), operators_1.tap(res => ipfsFile = res), operators_1.switchMap(() => rxjs_1.from(this.typingsGenerator.mergeTypings(namespace, `./build/${namespace}`, './build/index.d.ts'))), operators_1.switchMap(() => rxjs_1.of(ipfsFile)));
    }
};
__decorate([
    core_1.Inject(env_injection_tokens_1.__FILE_NAME),
    __metadata("design:type", String)
], CompilePlugin.prototype, "fileName", void 0);
__decorate([
    core_1.Inject(env_injection_tokens_1.__FOLDER),
    __metadata("design:type", String)
], CompilePlugin.prototype, "folder", void 0);
__decorate([
    core_1.Inject(env_injection_tokens_1.__IPFS_NODE_RESOLUTION_TIME),
    __metadata("design:type", Number)
], CompilePlugin.prototype, "resolutionTime", void 0);
__decorate([
    core_1.Inject(env_injection_tokens_1.__DEPLOYER_OUTPUT_CONFIG_NAME),
    __metadata("design:type", String)
], CompilePlugin.prototype, "outputConfigName", void 0);
__decorate([
    core_1.Inject(env_injection_tokens_1.__NAMESPACE),
    __metadata("design:type", String)
], CompilePlugin.prototype, "namespace", void 0);
__decorate([
    core_1.Inject(env_injection_tokens_1.__COMMIT_MESSAGE),
    __metadata("design:type", String)
], CompilePlugin.prototype, "commitMessage", void 0);
__decorate([
    core_1.Inject(env_injection_tokens_1.__FILE_EXTENSION),
    __metadata("design:type", String)
], CompilePlugin.prototype, "extension", void 0);
CompilePlugin = __decorate([
    core_1.Plugin(),
    __metadata("design:paramtypes", [parcel_bundler_service_1.ParcelBundlerService,
        core_1.BootstrapLogger,
        ipfs_file_service_1.FileIpfsService,
        file_service_1.FileService,
        file_user_service_1.FileUserService,
        dts_generator_service_1.TypescriptDefinitionGeneratorService,
        tsconfig_generator_service_1.TsConfigGenratorService,
        table_service_1.TableService,
        build_history_service_1.BuildHistoryService,
        previous_service_1.PreviousService,
        namespace_service_1.NamespaceService,
        error_reason_service_1.ErrorReasonService,
        status_service_1.StatusService,
        package_json_service_1.PackageJsonService,
        core_1.FileService,
        core_2.PubSubService])
], CompilePlugin);
exports.CompilePlugin = CompilePlugin;
//# sourceMappingURL=compile.plugin.js.map