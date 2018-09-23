#!/usr/bin/env node
import { __NODE_MODULES, __DEPLOYER_ARGUMENTS } from './env.injection.tokens';
import { Container, ConfigService, BootstrapFramework } from '@rxdi/core';
import { EnvironemntSetterModule } from './environment-setter.module';
import { AppModule } from './app/app.module';
import { nextOrDefault } from './app/services/arguments/arguments.service';

Container.get(ConfigService).setConfig({
    ...(process.argv.toString().includes('-v') || process.argv.toString().includes('--verbose')) ? ({
        logger: {
            logging: true,
            hashes: true,
            date: true,
            exitHandler: true,
            fileService: true
        }
    }) : ({}),
    init: false,
    initOptions: {
        services: true,
        pluginsAfter: nextOrDefault('--node-only', true, Boolean)
    }
});

BootstrapFramework(AppModule, [EnvironemntSetterModule])
    .subscribe(
        () => console.log('Bootstrap success!'),
        (error) => {
            throw new Error(error);
        },
    );

export * from './app/index';

