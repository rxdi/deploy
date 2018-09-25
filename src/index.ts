#!/usr/bin/env node
process.argv.toString().includes('--silent') ? console.log = () => null : null;

import { Container, ConfigService, BootstrapFramework } from '@rxdi/core';
import { EnvironemntSetterModule } from './environment-setter.module';
import { AppModule } from './app/app.module';

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
        plugins: true
    }
});

BootstrapFramework(AppModule, [EnvironemntSetterModule])
    .subscribe(
        () => {
            console.log('Bootstrap success!');
        },
        (error) => {
            throw new Error(error);
        },
    );

export * from './app/index';

