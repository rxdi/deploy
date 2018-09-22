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
const core_1 = require("@rxdi/core");
const file_service_1 = require("./file.service");
const parcel_bundler_service_1 = require("../parcel-bundler/parcel-bundler.service");
const rxjs_1 = require("rxjs");
const operators_1 = require("rxjs/operators");
const ipfs_file_service_1 = require("../ipfs-file/ipfs-file.service");
const dts_generator_service_1 = require("../dts-generator/dts-generator.service");
let FileUserService = class FileUserService {
    constructor(fileService, parcelBundler, ipfsFile, typingsGenerator, logger) {
        this.fileService = fileService;
        this.parcelBundler = parcelBundler;
        this.ipfsFile = ipfsFile;
        this.typingsGenerator = typingsGenerator;
        this.logger = logger;
        this.defaultBuildDirecctory = 'build';
        this.dag_name = 'reactive.json';
    }
    getTsConfig(filename) {
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
    completeBuildAndAddToIpfs(folder, file, namespace) {
        let ipfsFile;
        let ipfsTypings;
        let ipfsModule;
        let ipfsMessage = [{ hash: '', path: '', size: 0, content: '' }];
        this.logger.log('Bundling Started!\n');
        let m;
        return rxjs_1.from(this.parcelBundler.prepareBundler(folder + '/' + file, { outDir: this.defaultBuildDirecctory }))
            .pipe(operators_1.tap(() => this.logger.log('Bundling finished!\n')), operators_1.tap(() => this.logger.log(`Adding commit message ${process.argv[4]}...\n`)), operators_1.switchMap(() => this.ipfsFile.addFile(process.argv[4])), operators_1.tap(res => ipfsMessage = res), operators_1.tap(() => this.logger.log(`Commit message added...\n`)), operators_1.switchMap(() => this.fileService.readFile(`./build/${file.replace('.ts', '')}.js`)), operators_1.tap(() => this.logger.log(`Reading bundle ./build/${file.replace('.ts', '')}.js finished!\n`)), operators_1.switchMap((res) => this.ipfsFile.addFile(res)), operators_1.tap(res => ipfsFile = res), operators_1.tap(() => this.logger.log(`Bundle added to ipfs ./build/${file.replace('.ts', '')}.js\n`)), 
        // tap(() => this.logger.log(`Typescript definitions merge started!\n`)),
        operators_1.switchMap(() => rxjs_1.from(this.typingsGenerator.mergeTypings(namespace, folder, './build/index.d.ts'))), operators_1.tap(() => this.logger.log(`Typescript definitions merge finished! Reading file...\n`)), operators_1.switchMap(() => this.fileService.readFile(`./build/index.d.ts`)), operators_1.tap(() => this.logger.log(`Typescript definitions read finished! Adding to IPFS...\n`)), operators_1.switchMap((res) => this.ipfsFile.addFile(res)), operators_1.tap(res => ipfsTypings = res), operators_1.tap(() => this.logger.log(`Typescript definitions added to IPFS! Adding module configuration...\n`)), operators_1.switchMap(() => this.fileService.readFile(`${folder}/${this.dag_name}`)), operators_1.switchMap((d) => {
            const dag = JSON.parse(d);
            if (dag.module === ipfsFile[0].hash) {
                throw new Error(`
                    Module is with the same integrity and will not be uploaded again!
                    You need to make change to the module so it will be with different integrity!
                        `);
            }
            m = {
                name: namespace,
                typings: ipfsTypings[0].hash,
                module: ipfsFile[0].hash,
                message: ipfsMessage[0].hash,
                previews: [...dag.previews]
            };
            return this.ipfsFile.addFile(JSON.stringify(m, null, 4));
        }), operators_1.tap(res => ipfsModule = res), operators_1.tap(() => this.logger.log(`Module configuration added to ipfs!\n`)), operators_1.tap(() => {
            if (m.previews.length >= 20) {
                m.previews.shift();
            }
            m.previews = [...m.previews, ipfsModule[0].hash];
            this.writeDag(`${folder}/${this.dag_name}`, JSON.stringify(m, null, 4));
        }), operators_1.switchMap(() => rxjs_1.of({
            file: ipfsFile,
            typings: ipfsTypings,
            module: ipfsModule
        })));
    }
    completeBuildAndAddToIpfs2(namespace = '@gapi/core') {
        const fileName = 'index';
        const parcelOptions = { outDir: this.defaultBuildDirecctory };
        let ipfsFile;
        return rxjs_1.from(this.writeFile(`
import { Service } from '@rxdi/core';

@Service()
export class Pesho {
    constructor() {
        console.log('THIS IS PESHO SERVICE');
    }
}
        
        `, fileName + '.ts', namespace))
            .pipe(operators_1.switchMap(() => rxjs_1.from(this.writeFile(this.getTsConfig(fileName), 'tsconfig.json', namespace))), operators_1.switchMap(() => rxjs_1.from(this.parcelBundler.prepareBundler(`./build/${namespace}/${fileName}.ts`, parcelOptions))), operators_1.switchMap(() => this.fileService.readFile(`./build/${fileName}.js`)), operators_1.switchMap((res) => this.ipfsFile.addFile(res)), operators_1.tap(res => ipfsFile = res), operators_1.switchMap(() => rxjs_1.from(this.typingsGenerator.mergeTypings(namespace, `./build/${namespace}`, './build/index.d.ts'))), operators_1.switchMap(() => rxjs_1.of(ipfsFile)));
    }
    writeFile(file, fileName, namespace) {
        return __awaiter(this, void 0, void 0, function* () {
            return yield new Promise((resolve, reject) => __awaiter(this, void 0, void 0, function* () {
                this.fileService.ensureDir(`${this.defaultBuildDirecctory}/${namespace}`)
                    .subscribe(() => __awaiter(this, void 0, void 0, function* () {
                    yield this.fileService.writeFile(`${this.defaultBuildDirecctory}/${namespace}/${fileName}`, file);
                    resolve(true);
                }), e => reject(e));
            }));
        });
    }
    writeDag(path, file) {
        return __awaiter(this, void 0, void 0, function* () {
            return yield new Promise((resolve, reject) => __awaiter(this, void 0, void 0, function* () {
                yield this.fileService.writeFile(path, file);
                resolve(true);
            }));
        });
    }
};
FileUserService = __decorate([
    core_1.Service(),
    __metadata("design:paramtypes", [file_service_1.FileService,
        parcel_bundler_service_1.ParcelBundlerService,
        ipfs_file_service_1.FileIpfsService,
        dts_generator_service_1.TypescriptDefinitionGeneratorService,
        core_1.BootstrapLogger])
], FileUserService);
exports.FileUserService = FileUserService;
