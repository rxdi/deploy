"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
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
const arguments_service_1 = require("./app/services/arguments/arguments.service");
const env_injection_tokens_1 = require("./env.injection.tokens");
const tsconfig_generator_service_1 = require("./app/services/tsconfig-generator/tsconfig-generator.service");
const file_service_1 = require("./app/services/file/file.service");
const os_1 = require("os");
const Datastore = require("nedb");
const helpers_1 = require("./app/services/helpers/helpers");
const fs_1 = require("fs");
let EnvironemntSetterModule = class EnvironemntSetterModule {
};
EnvironemntSetterModule = __decorate([
    core_1.Module({
        services: [
            {
                provide: 'isLockExists',
                deps: [file_service_1.FileService],
                lazy: true,
                useFactory: (fileService) => __awaiter(this, void 0, void 0, function* () {
                    const repoLockPath = `${os_1.homedir()}/.jsipfs/repo.lock`;
                    const lockPath = `${os_1.homedir()}/.jsipfs/datastore/LOCK`;
                    try {
                        yield fileService.readFile(repoLockPath);
                        fs_1.unlinkSync(repoLockPath);
                    }
                    catch (e) { }
                    try {
                        yield fileService.readFile(lockPath);
                        fs_1.unlinkSync(lockPath);
                    }
                    catch (e) { }
                    return true;
                })
            },
            {
                provide: env_injection_tokens_1.__DEPLOYER_ARGUMENTS,
                useFactory: () => process.argv.slice(2)
            },
            {
                provide: env_injection_tokens_1.__NODE_MODULES,
                useValue: __dirname + '/node_modules'
            },
            {
                provide: env_injection_tokens_1.__ROOT_FOLDER,
                useValue: __dirname
            },
            {
                provide: env_injection_tokens_1.__HOME_DIR,
                useValue: os_1.homedir()
            },
            {
                provide: env_injection_tokens_1.__COMMIT_MESSAGE,
                deps: [env_injection_tokens_1.__DEPLOYER_ARGUMENTS],
                useFactory: (args) => {
                    const hasArgument = helpers_1.nextOrDefault('--message', false);
                    if (hasArgument) {
                        return hasArgument;
                    }
                    if (args[2] && args[2].includes('--')) {
                        return '';
                    }
                    return args[2] || '';
                }
            },
            {
                provide: env_injection_tokens_1.__PARCEL_BROWSER_BUILD,
                useFactory: () => helpers_1.includes('--browser')
            },
            {
                provide: env_injection_tokens_1.__PARCEL_MINIFY,
                useFactory: () => !helpers_1.includes('--unminify')
            },
            {
                provide: env_injection_tokens_1.__PARCEL_BUILD_OUT_DIR,
                useFactory: () => helpers_1.nextOrDefault('--out-dir', 'build')
            },
            {
                provide: env_injection_tokens_1.__PARCEL_SETTINGS,
                useFactory: () => ({
                    watch: false,
                    logLevel: 3,
                    detailedReport: true
                })
            },
            {
                provide: env_injection_tokens_1.__GENERATE_TS_CONFIG,
                useFactory: () => helpers_1.includes('--tsconfig')
            },
            {
                provide: env_injection_tokens_1.__FILE_PATH,
                deps: [env_injection_tokens_1.__DEPLOYER_ARGUMENTS],
                useFactory: (args) => {
                    if (helpers_1.includes('--file')) {
                        return helpers_1.nextOrDefault('--file', '');
                    }
                    if (args[0] && args[0].includes('--') && args[0] && !args[0].match(/[^\\]*\.(\w+)$/)) {
                        return './index.ts';
                    }
                    return args[0] || './index.ts';
                }
            },
            {
                provide: env_injection_tokens_1.__FILE_NAME,
                deps: [env_injection_tokens_1.__FILE_PATH],
                useFactory: (filePath) => filePath.split('/').pop()
            },
            {
                provide: env_injection_tokens_1.__NAMESPACE,
                deps: [env_injection_tokens_1.__DEPLOYER_ARGUMENTS],
                useFactory: (args) => {
                    if (helpers_1.includes('--namespace')) {
                        return helpers_1.nextOrDefault('--namespace', '@rxdi');
                    }
                    if (args[1] && args[1].includes('--')) {
                        return '@rxdi';
                    }
                    return args[1] || '@rxdi';
                }
            },
            {
                provide: env_injection_tokens_1.__FOLDER,
                deps: [env_injection_tokens_1.__FILE_PATH],
                useFactory: (filePath) => filePath.substring(0, filePath.lastIndexOf("/"))
            },
            {
                provide: env_injection_tokens_1.__FILE_EXTENSION,
                deps: [env_injection_tokens_1.__FILE_PATH],
                useFactory: (filePath) => {
                    return filePath.match(/\.([0-9a-z]+)(?:[\?#]|$)/i) ? filePath.match(/\.([0-9a-z]+)(?:[\?#]|$)/i)[0] : 'ts';
                }
            },
            {
                provide: env_injection_tokens_1.__IPFS_NODE_RESOLUTION_TIME,
                useFactory: () => helpers_1.nextOrDefault('--beat', 20, Number)
            },
            {
                provide: env_injection_tokens_1.__DEPLOYER_OUTPUT_CONFIG_NAME,
                useValue: helpers_1.nextOrDefault('--deployer-config-name', 'reactive.json')
            },
            {
                provide: env_injection_tokens_1.__PROCESSING_TIME_INIT,
                useFactory: () => Date.now()
            },
            {
                provide: env_injection_tokens_1.__PROCESSING_TIME_FINISH,
                useFactory: () => helpers_1.nextOrDefault('--deployer-config-name', 'reactive.json')
            },
            {
                provide: env_injection_tokens_1.__PROCESSING_TIME_END,
                deps: [arguments_service_1.ArgumentsService],
                useFactory: () => helpers_1.nextOrDefault('--deployer-config-name', 'reactive.json')
            },
            {
                provide: env_injection_tokens_1.__CREATE_HTML_PAGE,
                deps: [arguments_service_1.ArgumentsService],
                useFactory: () => helpers_1.nextOrDefault('--html', '<h1>@rxdi decentralized module</h1>')
            },
            {
                provide: 'init-ts-config-file',
                deps: [
                    env_injection_tokens_1.__GENERATE_TS_CONFIG,
                    env_injection_tokens_1.__FILE_NAME,
                    env_injection_tokens_1.__FOLDER,
                    tsconfig_generator_service_1.TsConfigGenratorService,
                    file_service_1.FileService
                ],
                lazy: true,
                useFactory: (tsConfig, fileName, folder, generator, fileService) => __awaiter(this, void 0, void 0, function* () {
                    if (tsConfig) {
                        yield fileService.writeFile(folder + '/tsconfig.json', generator.getTsConfig(fileName.replace('.ts', '')));
                    }
                    return tsConfig;
                })
            },
            {
                provide: env_injection_tokens_1.__SETTINGS_DATABASE,
                deps: [env_injection_tokens_1.__HOME_DIR],
                lazy: true,
                useFactory: (homeDir) => new Promise((resolve) => {
                    const database = new Datastore({ filename: `${homeDir}/.rxdi/settings`, autoload: true });
                    database.loadDatabase((e) => {
                        if (e) {
                            throw new Error('Error loading database!');
                        }
                        resolve(database);
                    });
                })
            },
            {
                provide: env_injection_tokens_1.__BUILD_HISTORY_DATABASE,
                deps: [env_injection_tokens_1.__HOME_DIR],
                lazy: true,
                useFactory: (homeDir) => new Promise((resolve) => {
                    const database = new Datastore({ filename: `${homeDir}/.rxdi/history`, autoload: true });
                    database.loadDatabase((e) => {
                        if (e) {
                            throw new Error('Error loading database!');
                        }
                        resolve(database);
                    });
                })
            },
            {
                provide: env_injection_tokens_1.__PREVIWS_DATABASE,
                deps: [env_injection_tokens_1.__HOME_DIR],
                lazy: true,
                useFactory: (homeDir) => new Promise((resolve) => {
                    const database = new Datastore({ filename: `${homeDir}/.rxdi/previews`, autoload: true });
                    database.loadDatabase((e) => {
                        if (e) {
                            throw new Error('Error loading database!');
                        }
                        resolve(database);
                    });
                })
            }
        ]
    })
], EnvironemntSetterModule);
exports.EnvironemntSetterModule = EnvironemntSetterModule;
//# sourceMappingURL=environment-setter.module.js.map