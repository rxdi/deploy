#!/usr/bin/env node
import { Container, ConfigService, Bootstrap, BootstrapLogger } from '@rxdi/core';
import { CoreModule, FileUserService, FileService } from './core/index';

const logger = Container.get(BootstrapLogger);
if (process.argv.toString().includes('-v') || process.argv.toString().includes('--verbose')) {
    Container.get(ConfigService).setConfig({ logger: { logging: true, hashes: true, date: true, exitHandler: true, fileService: true } });
}

Bootstrap(CoreModule)
    .subscribe(async () => {
        const filePath = process.argv[2];
        const namespace = process.argv[3];
        const fileUserService = Container.get(FileUserService);
        const fileService = Container.get(FileService);
        const file = filePath.replace(/^.*[\\\/]/, '');
        const folder = filePath.substring(0, filePath.lastIndexOf("/"));

        if (process.argv.toString().includes('--tsconfig')) {
            await fileService.writeFile(folder + '/tsconfig.json', fileUserService.getTsConfig(file.replace('.ts', '')));
        }

        fileUserService.completeBuildAndAddToIpfs(folder, file, namespace)
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

