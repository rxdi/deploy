#!/usr/bin/env node
import { Container, ConfigService, Bootstrap, BootstrapLogger } from '@rxdi/core';
import { AppModule, FileUserService, FileService } from './app/index';
import { __NODE_MODULES } from './env.injection.tokens';
import { interval } from 'rxjs';
import { map, take, tap, switchMapTo } from 'rxjs/operators';

const logger = Container.get(BootstrapLogger);

if (process.argv.toString().includes('-v') || process.argv.toString().includes('--verbose')) {
    Container.get(ConfigService).setConfig({ logger: { logging: true, hashes: true, date: true, exitHandler: true, fileService: true } });
}

Container.set(__NODE_MODULES, __dirname + '/node_modules');

Bootstrap(AppModule)
    .subscribe(async () => {
        const filePath = process.argv[2];
        const namespace = process.argv[3];
        const message = process.argv[4];
        const fileUserService = Container.get(FileUserService);
        const fileService = Container.get(FileService);
        const start = 10;
        const file = filePath.split('/').pop();
        const folder = filePath.substring(0, filePath.lastIndexOf("/"));
        // const extension = filePath.match(/\.([0-9a-z]+)(?:[\?#]|$)/i)[0];
        if (process.argv.toString().includes('--tsconfig')) {
            await fileService.writeFile(folder + '/tsconfig.json', fileUserService.getTsConfig(file.replace('.ts', '')));
        }
        fileUserService.completeBuildAndAddToIpfs(folder, file, namespace, message)
            .pipe(
                tap((res) => {
                    logger.log(`Package added to IPFS: ${JSON.stringify(res, null, 4)}`);
                    logger.log(`Module deployed to ipfs node will exit in: ${start} seconds`);
                }),
                switchMapTo(interval(1000)),
                take(start),
                map(v => (start - 1) - v)
            )
            .subscribe(
                (counter) => {
                    logger.log(`${counter}`);
                    if (!counter) {
                        process.exit(0);
                    }
                },
                e => {
                    logger.error(e);
                    process.exit(1);
                });
    });

export * from './app/index';

