#!/usr/bin/env node
import { includes } from './app/services/arguments/arguments.service';

includes('--silent') || includes('--webui') ? console.log = () => null : null;

import { Container, ConfigService, BootstrapFramework } from '@rxdi/core';
import { EnvironemntSetterModule } from './environment-setter.module';
import { AppModule } from './app/app.module';
import { FrameworkImports } from './framework-imports';

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
    init: true,
    initOptions: {
        services: true,
        plugins: true,
        controllers: true
    }
});

const _FRAMEWORK_IMPORTS = [EnvironemntSetterModule];

includes('--webui') ? _FRAMEWORK_IMPORTS.push(FrameworkImports) : null;

BootstrapFramework(AppModule, _FRAMEWORK_IMPORTS)
    .subscribe(
        () => {
            console.log('Bootstrap success!');
        },
        (error) => {
            throw new Error(error);
        },
    );

export * from './app/index';
export * from './framework-imports';