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
let EnvironemntSetterModule = class EnvironemntSetterModule {
};
EnvironemntSetterModule = __decorate([
    core_1.Module({
        services: [
            {
                provide: env_injection_tokens_1.__NODE_MODULES,
                useValue: __dirname + '/node_modules'
            },
            {
                provide: env_injection_tokens_1.__HOME_DIR,
                useValue: os_1.homedir()
            },
            {
                provide: env_injection_tokens_1.__DEPLOYER_ARGUMENTS,
                useValue: process.argv.slice(2)
            },
            {
                provide: env_injection_tokens_1.__COMMIT_MESSAGE,
                deps: [env_injection_tokens_1.__DEPLOYER_ARGUMENTS],
                useFactory: (args) => {
                    if (args[2] && args[2].includes('--') || args[2] && args[2].includes('-')) {
                        return '';
                    }
                    return args[2] || '';
                }
            },
            {
                provide: env_injection_tokens_1.__PARCEL_BROWSER_BUILD,
                deps: [env_injection_tokens_1.__DEPLOYER_ARGUMENTS],
                useFactory: (args) => args.toString().includes('--browser')
            },
            {
                provide: env_injection_tokens_1.__PARCEL_MINIFY,
                deps: [env_injection_tokens_1.__DEPLOYER_ARGUMENTS],
                useFactory: (args) => args.toString().includes('--minify')
            },
            {
                provide: env_injection_tokens_1.__PARCEL_BUILD_OUT_DIR,
                useValue: arguments_service_1.nextOrDefault('--out-dir', 'build')
            },
            {
                provide: env_injection_tokens_1.__PARCEL_SETTINGS,
                useValue: {
                    watch: false,
                    logLevel: 3,
                    detailedReport: true
                }
            },
            {
                provide: env_injection_tokens_1.__GENERATE_TS_CONFIG,
                deps: [env_injection_tokens_1.__DEPLOYER_ARGUMENTS],
                useFactory: (args) => args.toString().includes('--tsconfig')
            },
            {
                provide: env_injection_tokens_1.__FILE_PATH,
                deps: [env_injection_tokens_1.__DEPLOYER_ARGUMENTS],
                useFactory: (args) => args[0] || 'index.ts'
            },
            {
                provide: env_injection_tokens_1.__FILE_NAME,
                deps: [env_injection_tokens_1.__FILE_PATH],
                useFactory: (filePath) => filePath.split('/').pop()
            },
            {
                provide: env_injection_tokens_1.__NAMESPACE,
                deps: [env_injection_tokens_1.__DEPLOYER_ARGUMENTS],
                useFactory: (args) => args[1] || '@default'
            },
            {
                provide: env_injection_tokens_1.__FOLDER,
                deps: [env_injection_tokens_1.__FILE_PATH],
                useFactory: (filePath) => filePath.substring(0, filePath.lastIndexOf("/"))
            },
            {
                provide: env_injection_tokens_1.__FILE_EXTENSION,
                deps: [env_injection_tokens_1.__FILE_PATH],
                useFactory: (filePath) => filePath.match(/\.([0-9a-z]+)(?:[\?#]|$)/i) ? filePath.match(/\.([0-9a-z]+)(?:[\?#]|$)/i)[0] : 'index.ts'
            },
            {
                provide: env_injection_tokens_1.__IPFS_NODE_RESOLUTION_TIME,
                useValue: arguments_service_1.nextOrDefault('--beat', 10, Number)
            },
            {
                provide: env_injection_tokens_1.__DEPLOYER_OUTPUT_CONFIG_NAME,
                useValue: arguments_service_1.nextOrDefault('--deployer-config-name', 'reactive.json')
            },
            {
                provide: env_injection_tokens_1.__PROCESSING_TIME_INIT,
                useValue: Date.now()
            },
            {
                provide: env_injection_tokens_1.__PROCESSING_TIME_FINISH,
                useValue: arguments_service_1.nextOrDefault('--deployer-config-name', 'reactive.json')
            },
            {
                provide: env_injection_tokens_1.__PROCESSING_TIME_END,
                deps: [arguments_service_1.ArgumentsService],
                useValue: arguments_service_1.nextOrDefault('--deployer-config-name', 'reactive.json')
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