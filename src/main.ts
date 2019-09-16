#!/usr/bin/env node
// process.argv.push('--webui');
import { checkArguments } from './check-arguments';
import { Container, ConfigService, BootstrapFramework } from '@rxdi/core';
import { CommandDescription } from './commands-description';
import { includes } from './app/services/helpers/helpers';
import { LoggerService } from './app/services/logger/logger.service';
const Table = require('terminal-table');
const originalLog = console.log;

console.log = function(...a) {
  Container.get(LoggerService).stdout.next(a.toString());
  return originalLog(...a);
};

includes('--silent') ? (console.log = () => null) : null;

if (includes('--help')) {
  const t = new Table({
    borderStyle: 2,
    horizontalLine: true,
    width: ['20%', '80%'],
    leftPadding: 1,
  });
  t.push(['Command', 'Description']);
  t.push([`\Available arguments are:`]);
  Object.keys(CommandDescription).forEach(c =>
    t.push([c, CommandDescription[c]])
  );
  t.attrRange(
    { row: [0, 1] },
    {
      align: 'center',
      color: 'green',
      bg: 'black',
    }
  );
  console.log('' + t);
  process.exit(0);
}

checkArguments();

import { EnvironemntSetterModule } from './environment-setter.module';
import { AppModule } from './app/app.module';
import { GapiFrameworkImports } from './gapi-framework-imports';

Container.get(ConfigService).setConfig({
  ...(process.argv.toString().includes('-v') ||
  process.argv.toString().includes('--verbose')
    ? {
        logger: {
          logging: true,
          hashes: false,
          date: true,
          exitHandler: true,
          fileService: true,
        },
      }
    : {}),
  init: false,
  initOptions: {
    services: true,
    plugins: true,
    controllers: true,
  },
});

const _FRAMEWORK_IMPORTS = [
  EnvironemntSetterModule,
  GapiFrameworkImports.forRoot(
    includes('--webui') || includes('--graphql-server-only')
  ),
];

BootstrapFramework(AppModule, _FRAMEWORK_IMPORTS).subscribe(
  () => {
    console.log('Started! Use --open-browser argument! Enjoy! :)');
  },
  error => {
    throw new Error(error);
  }
);

export * from './app/index';
export * from './gapi-framework-imports';
export * from './env.injection.tokens';
export * from './commands';
export * from './check-arguments';
export * from './commands-description';
