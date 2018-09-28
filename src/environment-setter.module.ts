import { Module } from '@rxdi/core';
import { ArgumentsService } from './app/services/arguments/arguments.service';
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
    __COMMIT_MESSAGE,
    __CREATE_HTML_PAGE,
    __ROOT_FOLDER
} from './env.injection.tokens';
import { TsConfigGenratorService } from './app/services/tsconfig-generator/tsconfig-generator.service';
import { FileService } from './app/services/file/file.service';
import { homedir } from 'os';
import * as Datastore from 'nedb';
import { includes, nextOrDefault } from './app/services/helpers/helpers';
import { unlinkSync } from 'fs';


@Module({
    services: [
        {
            provide: 'isLockExists',
            deps: [FileService],
            lazy: true,
            useFactory: async (fileService: FileService) => {
                const repoLockPath = `${homedir()}/.jsipfs/repo.lock`;
                const lockPath = `${homedir()}/.jsipfs/datastore/LOCK`;
                try {
                    await fileService.readFile(repoLockPath);
                    unlinkSync(repoLockPath);
                } catch (e) {}
                try {
                    await fileService.readFile(lockPath);
                    unlinkSync(lockPath);
                } catch(e) {}
                return true;
            }
        },
        {
            provide: __DEPLOYER_ARGUMENTS,
            useFactory: () => process.argv.slice(2)  
        },
        {
            provide: __NODE_MODULES,
            useValue: __dirname + '/node_modules'
        },
        {
            provide: __ROOT_FOLDER,
            useValue: __dirname
        },
        {
            provide: __HOME_DIR,
            useValue: homedir()
        },
        {
            provide: __COMMIT_MESSAGE,
            deps: [__DEPLOYER_ARGUMENTS],
            useFactory: (args: __DEPLOYER_ARGUMENTS) => {
                const hasArgument = nextOrDefault('--message', false);
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
            provide: __PARCEL_BROWSER_BUILD,
            useFactory: () => includes('--browser')
        },
        {
            provide: __PARCEL_MINIFY,
            useFactory: () => !includes('--unminify')
        },
        {
            provide: __PARCEL_BUILD_OUT_DIR,
            useFactory: () => nextOrDefault('--out-dir', 'build')
        },
        {
            provide: __PARCEL_SETTINGS,
            useFactory: () => ({
                watch: false,
                logLevel: 3,
                detailedReport: true
            })
        },
        {
            provide: __GENERATE_TS_CONFIG,
            useFactory: (): __GENERATE_TS_CONFIG => includes('--tsconfig')
        },
        {
            provide: __FILE_PATH,
            deps: [__DEPLOYER_ARGUMENTS],
            useFactory: (args: __DEPLOYER_ARGUMENTS) => {
                if (includes('--file')) {
                    return nextOrDefault('--file', '');
                }
                if (args[0] && args[0].includes('--') && args[0] && !args[0].match(/[^\\]*\.(\w+)$/)) {
                    return './index.ts';
                }
                return args[0] || './index.ts';
            }
        },
        {
            provide: __FILE_NAME,
            deps: [__FILE_PATH],
            useFactory: (filePath: __FILE_PATH) => filePath.split('/').pop()
        },
        {
            provide: __NAMESPACE,
            deps: [__DEPLOYER_ARGUMENTS],
            useFactory: (args: __DEPLOYER_ARGUMENTS) => {
                if (includes('--namespace')) {
                    return nextOrDefault('--namespace', '@rxdi');
                }
                if (args[1] && args[1].includes('--')) {
                    return '@rxdi';
                }
                return args[1] || '@rxdi';
            }
        },
        {
            provide: __FOLDER,
            deps: [__FILE_PATH],
            useFactory: (filePath: __FILE_PATH) => filePath.substring(0, filePath.lastIndexOf("/"))
        },
        {
            provide: __FILE_EXTENSION,
            deps: [__FILE_PATH],
            useFactory: (filePath: __FILE_PATH) => {
                return filePath.match(/\.([0-9a-z]+)(?:[\?#]|$)/i) ? filePath.match(/\.([0-9a-z]+)(?:[\?#]|$)/i)[0] : 'ts';
            }
        },
        {
            provide: __IPFS_NODE_RESOLUTION_TIME,
            useFactory: () => nextOrDefault('--beat', 20, Number)
        },
        {
            provide: __DEPLOYER_OUTPUT_CONFIG_NAME,
            useValue: nextOrDefault('--deployer-config-name', 'reactive.json')
        },
        {
            provide: __PROCESSING_TIME_INIT,
            useFactory: () => Date.now()
        },
        {
            provide: __PROCESSING_TIME_FINISH,
            useFactory: () => nextOrDefault('--deployer-config-name', 'reactive.json')
        },
        {
            provide: __PROCESSING_TIME_END,
            deps: [ArgumentsService],
            useFactory: () => nextOrDefault('--deployer-config-name', 'reactive.json')
        },
        {
            provide: __CREATE_HTML_PAGE,
            deps: [ArgumentsService],
            useFactory: () => nextOrDefault('--html', '<h1>@rxdi decentralized module</h1>')
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
