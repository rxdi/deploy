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
const file_user_service_1 = require("../file/file-user.service");
const parcel_bundler_service_1 = require("../parcel-bundler/parcel-bundler.service");
const ipfs_file_service_1 = require("../ipfs-file/ipfs-file.service");
const file_service_1 = require("../file/file.service");
const dts_generator_service_1 = require("../dts-generator/dts-generator.service");
const tsconfig_generator_service_1 = require("../tsconfig-generator/tsconfig-generator.service");
const status_injection_tokens_1 = require("../../status/status-injection.tokens");
const table_service_1 = require("../table-service/table-service");
const build_history_service_1 = require("../build-history/build-history.service");
const previews_service_1 = require("../previews/previews.service");
let CompilePlugin = class CompilePlugin {
    constructor(parcelBundler, logger, ipfsFile, fileService, fileUserService, typingsGenerator, tsConfigGenerator, tableService, buildHistoryService, previwsService) {
        this.parcelBundler = parcelBundler;
        this.logger = logger;
        this.ipfsFile = ipfsFile;
        this.fileService = fileService;
        this.fileUserService = fileUserService;
        this.typingsGenerator = typingsGenerator;
        this.tsConfigGenerator = tsConfigGenerator;
        this.tableService = tableService;
        this.buildHistoryService = buildHistoryService;
        this.previwsService = previwsService;
        console.log('INIT');
    }
    register() {
        return __awaiter(this, void 0, void 0, function* () {
            this.compile();
        });
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
    completeBuildAndAddToIpfs(folder, file, message, namespace, outputConfigName) {
        let ipfsFile;
        let ipfsFileMetadata = [{ hash: '', path: '', size: 0, content: '' }];
        let ipfsTypings;
        let ipfsModule;
        let ipfsMessage = [{ hash: '', path: '', size: 0, content: '' }];
        this.logger.log('Bundling Started!\n');
        let m;
        let dag;
        return rxjs_1.from(this.parcelBundler.prepareBundler(folder + '/' + file))
            .pipe(operators_1.tap(() => this.logger.log('Bundling finished!\n')), operators_1.tap(() => this.logger.log(`Adding commit message ${message}...\n`)), operators_1.switchMap(() => this.ipfsFile.addFile(message)), operators_1.tap(res => ipfsMessage = res), operators_1.tap(() => this.logger.log(`Commit message added...\n`)), operators_1.switchMap(() => this.fileService.readFile(`./build/${file.split('.')[0]}.js`)), operators_1.tap(() => this.logger.log(`Reading bundle ./build/${file.split('.')[0]}.js finished!\n`)), operators_1.switchMap((res) => this.ipfsFile.addFile(res)), operators_1.tap(res => ipfsFile = res), operators_1.tap(() => this.logger.log(`Bundle added to ipfs ./build/${file.split('.')[0]}.js\n`)), operators_1.switchMap(() => rxjs_1.from(this.typingsGenerator.mergeTypings(namespace, folder, './build/index.d.ts'))), operators_1.tap(() => this.logger.log(`Typescript definitions merge finished! Reading file...\n`)), operators_1.switchMap(() => this.fileService.readFile(`./build/index.d.ts`)), operators_1.tap(() => this.logger.log(`Typescript definitions read finished! Adding to IPFS...\n`)), operators_1.switchMap((res) => this.ipfsFile.addFile(res)), operators_1.tap(res => ipfsTypings = res), operators_1.tap(() => this.logger.log(`Typescript definitions added to IPFS! Adding module configuration...\n`)), operators_1.switchMap(() => this.fileService.readFilePromisifyFallback(`${folder}/${outputConfigName}`)), operators_1.switchMap((d) => __awaiter(this, void 0, void 0, function* () {
            dag = JSON.parse(d);
            m = dag;
            if (dag.module === ipfsFile[0].hash) {
                ipfsModule = yield this.ipfsFile.addFile(JSON.stringify(dag, null, 4));
                this.logger.log(`
                    !! Warning !!
                    Module is with the same integrity and will not be uploaded again!
                    You need to make change to the module so it will be with different integrity!
                        `);
                this.$deploymentStatus.next(Object.assign({}, this.$deploymentStatus.getValue(), { file: false, module: false }));
            }
            else {
                let iterable = dag.previews || [];
                m = {
                    name: namespace,
                    typings: ipfsTypings[0].hash,
                    module: ipfsFile[0].hash,
                    date: new Date(),
                    metadata: ipfsFileMetadata[0].hash,
                    message: ipfsMessage[0].hash,
                    previews: [...iterable]
                };
                ipfsModule = yield this.ipfsFile.addFile(JSON.stringify(m, null, 4));
                if (m.previews.length >= 20) {
                    m.previews.shift();
                }
                m.previews = [...m.previews, ipfsModule[0].hash];
                this.fileUserService.writeDag(`${folder}/${outputConfigName}`, JSON.stringify(m, null, 4));
                return ipfsModule;
            }
            if (dag.typings === ipfsTypings[0].hash) {
                this.logger.log(`
                    !! Warning !!
                    Typings are with the same integrity and will not be uploaded again!
                    You need to make change to the module so it will be with different integrity!
                        `);
                this.$deploymentStatus.next(Object.assign({}, this.$deploymentStatus.getValue(), { typings: false }));
            }
            return rxjs_1.of(dag);
        })), operators_1.tap(() => this.logger.log(`Module configuration added to ipfs!\n`)), operators_1.switchMap(() => rxjs_1.of({
            file: ipfsFile,
            typings: ipfsTypings,
            module: ipfsModule
        })), operators_1.tap(() => {
            console.log('' + this.tableService.previewsVersions(m.previews));
            console.log('' + this.tableService.previewsNext(m.previews));
            console.log('' + this.tableService.endInstallCommand(ipfsModule[0].hash));
            console.log('' + this.tableService.createTable(ipfsFile, ipfsTypings, ipfsModule));
            this.buildHistoryService.insert({
                status: {
                    file: this.$deploymentStatus.getValue().file,
                    typings: this.$deploymentStatus.getValue().typings,
                    module: this.$deploymentStatus.getValue().module
                },
                hash: ipfsModule[0].hash,
                name: namespace,
                date: new Date(),
                typings: ipfsTypings[0].hash,
                module: ipfsFile[0].hash,
                metadata: ipfsFileMetadata[0].hash,
                message: ipfsMessage[0].hash
            })
                .pipe(operators_1.switchMapTo(this.previwsService.insert({
                name: namespace,
                hash: ipfsModule[0].hash,
                date: new Date()
            })))
                .subscribe(() => this.logger.log('Module saved to persistant history!'));
        }));
    }
    logSuccess(res) {
        console.log(`Module deploy finish ipfs node will shitdown in: ${this.resolutionTime} seconds`);
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
    core_1.Inject(status_injection_tokens_1.FILE_DEPLOYMENT_STATUS),
    __metadata("design:type", Object)
], CompilePlugin.prototype, "$deploymentStatus", void 0);
__decorate([
    core_1.Inject(env_injection_tokens_1.__COMMIT_MESSAGE),
    __metadata("design:type", String)
], CompilePlugin.prototype, "commitMessage", void 0);
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
        previews_service_1.PreviwsService])
], CompilePlugin);
exports.CompilePlugin = CompilePlugin;
//# sourceMappingURL=compile.service.js.map