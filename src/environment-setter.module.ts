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
    __FILE_NAME
} from './env.injection.tokens';
import { TsConfigGenratorService } from './app/services/tsconfig-generator/tsconfig-generator.service';
import { FileService } from './app/services/file/file.service';

@Module({
    services: [
        {
            provide: __NODE_MODULES,
            useValue: __dirname + '/node_modules'
        },
        {
            provide: __DEPLOYER_ARGUMENTS,
            useFactory: () => {
                console.log('SEGA', process.argv.slice(2));
                return process.argv.slice(2);
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
            deps: [ArgumentsService],
            useFactory: (as: ArgumentsService) => as.nextOrDefault('--out-dir', 'build')
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
            useFactory: (args: __DEPLOYER_ARGUMENTS) => args[0]
        },
        {
            provide: __FILE_NAME,
            deps: [__FILE_PATH],
            useFactory: (filePath: __FILE_PATH) => filePath.split('/').pop()
        },
        {
            provide: __NAMESPACE,
            deps: [__DEPLOYER_ARGUMENTS],
            useFactory: (args: __DEPLOYER_ARGUMENTS) => args[1]
        },
        {
            provide: __FOLDER,
            deps: [__FILE_PATH],
            useFactory: (filePath: __FILE_PATH) => filePath.substring(0, filePath.lastIndexOf("/"))
        },
        {
            provide: __FILE_EXTENSION,
            deps: [__FILE_PATH],
            useFactory: (filePath: __FILE_PATH) => filePath.match(/\.([0-9a-z]+)(?:[\?#]|$)/i)[0]
        },
        {
            provide: __IPFS_NODE_RESOLUTION_TIME,
            deps: [ArgumentsService],
            useFactory: (as: ArgumentsService) => as.nextOrDefault('--beat', 10, Number)
        },
        {
            provide: __DEPLOYER_OUTPUT_CONFIG_NAME,
            deps: [ArgumentsService],
            useFactory: (as: ArgumentsService) => as.nextOrDefault('--deployer-config-name', 'reactive.json')
        },
        {
            provide: __PROCESSING_TIME_INIT,
            useValue: Date.now()
        },
        {
            provide: __PROCESSING_TIME_FINISH,
            deps: [ArgumentsService],
            useFactory: (as: ArgumentsService) => as.nextOrDefault('--deployer-config-name', 'reactive.json')
        },
        {
            provide: __PROCESSING_TIME_END,
            deps: [ArgumentsService],
            useFactory: (as: ArgumentsService) => as.nextOrDefault('--deployer-config-name', 'reactive.json')
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
        }
    ]
})
export class EnvironemntSetterModule { }
