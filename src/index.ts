#!/usr/bin/env node
import { Container, ConfigService, Bootstrap, BootstrapLogger } from '@rxdi/core';
import { CoreModule, FileUserService, FileService } from './core/index';
import { __NODE_MODULES } from './env.injection.tokens';
import { existsSync } from 'fs';

const logger = Container.get(BootstrapLogger);
if (process.argv.toString().includes('-v') || process.argv.toString().includes('--verbose')) {
    Container.get(ConfigService).setConfig({ logger: { logging: true, hashes: true, date: true, exitHandler: true, fileService: true } });
}

Container.set(__NODE_MODULES, __dirname + '/node_modules');

Bootstrap(CoreModule)
    .subscribe(async () => {
        let filePath = process.argv[2];
        let namespace = process.argv[3];
        let message = process.argv[4];
        const fileUserService = Container.get(FileUserService);
        const fileService = Container.get(FileService);
        let file = filePath.split('/').pop();
        // let extension = filePath.match(/\.([0-9a-z]+)(?:[\?#]|$)/i)[0];
        let folder = filePath.substring(0, filePath.lastIndexOf("/"));
        if (process.argv.toString().includes('--tsconfig')) {
            await fileService.writeFile(folder + '/tsconfig.json', fileUserService.getTsConfig(file.replace('.ts', '')));
        }
        fileUserService.completeBuildAndAddToIpfs(folder, file, namespace, message)
            .subscribe(
                (res) => {
                    setTimeout(() => {
                        logger.log(`Package added to IPFS: ${JSON.stringify(res, null, 4)}`);
                        process.exit(0);
                    }, 7000);
                },
                e => {
                    logger.error(e);
                    process.exit(1);
                });
    });

export * from './core/index';

