import { Module } from '@rxdi/core';
import { ArgumentsService, nextOrDefault } from './app/services/arguments/arguments.service';
import {
    __NODE_MODULES,
    __DEPLOYER_ARGUMENTS,
    __PARCEL_BROWSER_BUILD,
    __PARCEL_MINIFY,
    __PARCEL_BUILD_OUT_DIR,
    __PARCEL_SETTINGS,
    __GENERATE_TS_CONFIG,
    __FILE_PATH,
    __NAMESPACE,
    __FOLDER,
    __FILE_EXTENSION,
    __IPFS_NODE_RESOLUTION_TIME,
    __DEPLOYER_OUTPUT_CONFIG_NAME,
    __PROCESSING_TIME_INIT,
    __PROCESSING_TIME_FINISH,
    __PROCESSING_TIME_END,
    __FILE_NAME,
    __HOME_DIR,
    __SETTINGS_DATABASE,
    __BUILD_HISTORY_DATABASE,
    __PREVIWS_DATABASE,
    __COMMIT_MESSAGE
} from './env.injection.tokens';
import { TsConfigGenratorService } from './app/services/tsconfig-generator/tsconfig-generator.service';
import { FileService } from './app/services/file/file.service';
import { homedir } from 'os';
import * as Datastore from 'nedb';

@Module({
    services: [
        {
            provide: __NODE_MODULES,
            useValue: __dirname + '/node_modules'
        },
        {
            provide: __HOME_DIR,
            useValue: homedir()
        },
        {
            provide: __DEPLOYER_ARGUMENTS,
            useValue: process.argv.slice(2)
        },
        {
            provide: __COMMIT_MESSAGE,
            deps: [__DEPLOYER_ARGUMENTS],
            useFactory: (args: __DEPLOYER_ARGUMENTS) => {
                if (args[2] && args[2].includes('--') || args[2] && args[2].includes('-')) {
                    return '';
                }
                return args[2] || '';
            }
        },
        {
            provide: __PARCEL_BROWSER_BUILD,
            deps: [__DEPLOYER_ARGUMENTS],
            useFactory: (args: __DEPLOYER_ARGUMENTS) => args.toString().includes('--browser')
        },
        {
            provide: __PARCEL_MINIFY,
            deps: [__DEPLOYER_ARGUMENTS],
            useFactory: (args: __DEPLOYER_ARGUMENTS) => args.toString().includes('--minify')
        },
        {
            provide: __PARCEL_BUILD_OUT_DIR,
            useValue: nextOrDefault('--out-dir', 'build')
        },
        {
            provide: __PARCEL_SETTINGS,
            useValue: {
                watch: false,
                logLevel: 3,
                detailedReport: true
            }
        },
        {
            provide: __GENERATE_TS_CONFIG,
            deps: [__DEPLOYER_ARGUMENTS],
            useFactory: (args: __DEPLOYER_ARGUMENTS): __GENERATE_TS_CONFIG => args.toString().includes('--tsconfig')
        },
        {
            provide: __FILE_PATH,
            deps: [__DEPLOYER_ARGUMENTS],
            useFactory: (args: __DEPLOYER_ARGUMENTS) => args[0] || 'index.ts'
        },
        {
            provide: __FILE_NAME,
            deps: [__FILE_PATH],
            useFactory: (filePath: __FILE_PATH) => filePath.split('/').pop()
        },
        {
            provide: __NAMESPACE,
            deps: [__DEPLOYER_ARGUMENTS],
            useFactory: (args: __DEPLOYER_ARGUMENTS) => args[1] || '@default'
        },
        {
            provide: __FOLDER,
            deps: [__FILE_PATH],
            useFactory: (filePath: __FILE_PATH) => filePath.substring(0, filePath.lastIndexOf("/"))
        },
        {
            provide: __FILE_EXTENSION,
            deps: [__FILE_PATH],
            useFactory: (filePath) => filePath.match(/\.([0-9a-z]+)(?:[\?#]|$)/i) ? filePath.match(/\.([0-9a-z]+)(?:[\?#]|$)/i)[0] : 'index.ts'
        },
        {
            provide: __IPFS_NODE_RESOLUTION_TIME,
            useValue: nextOrDefault('--beat', 10, Number)
        },
        {
            provide: __DEPLOYER_OUTPUT_CONFIG_NAME,
            useValue: nextOrDefault('--deployer-config-name', 'reactive.json')
        },
        {
            provide: __PROCESSING_TIME_INIT,
            useValue: Date.now()
        },
        {
            provide: __PROCESSING_TIME_FINISH,
            useValue: nextOrDefault('--deployer-config-name', 'reactive.json')
        },
        {
            provide: __PROCESSING_TIME_END,
            deps: [ArgumentsService],
            useValue: nextOrDefault('--deployer-config-name', 'reactive.json')
        },
        {
            provide: 'init-ts-config-file',
            deps: [
                __GENERATE_TS_CONFIG,
                __FILE_NAME,
                __FOLDER,
                TsConfigGenratorService,
                FileService
            ],
            lazy: true,
            useFactory: async (
                tsConfig: __GENERATE_TS_CONFIG,
                fileName: __FILE_NAME,
                folder: __FOLDER,
                generator: TsConfigGenratorService,
                fileService: FileService
            ) => {
                if (tsConfig) {
                    await fileService.writeFile(folder + '/tsconfig.json', generator.getTsConfig(fileName.replace('.ts', '')));
                }
                return tsConfig;
            }
        },
        {
            provide: __SETTINGS_DATABASE,
            deps: [__HOME_DIR],
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
            provide: __BUILD_HISTORY_DATABASE,
            deps: [__HOME_DIR],
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
            provide: __PREVIWS_DATABASE,
            deps: [__HOME_DIR],
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
export class EnvironemntSetterModule { }
