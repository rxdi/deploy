import { Module } from '@rxdi/core';
import { IpfsModule } from '@gapi/ipfs';
import { IpfsDaemonModule } from '@gapi/ipfs-daemon';
import { FileIpfsService } from './services/ipfs-file/ipfs-file.service';
import { FileService } from './services/file/file.service';
import { ParcelBundlerService } from './services/parcel-bundler/parcel-bundler.service';
import { FileUserService } from './services/file/file-user.service';
import { TypescriptDefinitionGeneratorService } from './services/dts-generator/dts-generator.service';
import { TsConfigGenratorService } from './services/tsconfig-generator/tsconfig-generator.service';
import { TableService } from './services/table-service/table-service';
import { StatusModule } from './status/status.module';
import { BuildHistoryService } from './services/build-history/build-history.service';
import { ErrorReasonService } from './services/error-reason/error-reason.service';
import { CompilePlugin } from './plugins/compile/compile.plugin';
import { TimeService } from './services/time/time.service';
import {
  HtmlTemplateBuilder,
  PackageJsonService,
  nextOrDefault,
  includes,
  PreviousService,
  LoggerService,
} from './services';
import { ServerModule } from './server/server.module';
import { TranspileTypescript } from './core/helpers/transpile-typescript';
import { join } from 'path';
import { getFirstItem } from './core/helpers/get-first-item';
import { RequestHandler } from '../env.injection.tokens';
import { getSecondItem } from './core/helpers/get-second-item';

const _IMPORTS = [
  IpfsDaemonModule.forRoot({
    type: nextOrDefault('--default-ipfs-node', 'go'),
    config: {
      Addresses: {
        API: process.env.IPFS_API_PORT
          ? process.env.IPFS_API_PORT
          : nextOrDefault('--ipfs-api-port', '/ip4/0.0.0.0/tcp/5002', a => `/ip4/0.0.0.0/tcp/${a}`),
        Gateway: process.env.IPFS_API_GATEWAY
          ? process.env.IPFS_API_GATEWAY
          : nextOrDefault('--ipfs-api-gateway', '/ip4/0.0.0.0/tcp/8081', a => `/ip4/0.0.0.0/tcp/${a}`),
        Swarm: nextOrDefault('--ipfs-swarms', ['/ip4/0.0.0.0/tcp/4001', '/ip6/::/tcp/4001'], a => a.split(',')),
      },
    },
  }),
  IpfsModule.forRoot(),
  StatusModule,
];

includes('--webui') ? _IMPORTS.push(ServerModule) : null;

@Module({
  imports: _IMPORTS,
  services: [
    FileIpfsService,
    FileService,
    ParcelBundlerService,
    FileUserService,
    TypescriptDefinitionGeneratorService,
    TsConfigGenratorService,
    TableService,
    BuildHistoryService,
    ErrorReasonService,
    TimeService,
    HtmlTemplateBuilder,
    PackageJsonService,
    PreviousService,
    LoggerService,
  ],
  plugins: [CompilePlugin],
  providers: [
    {
      provide: RequestHandler,
      lazy: true,
      useFactory: async () => {
        const interceptorPath: string = nextOrDefault('--interceptor', null);
        if (interceptorPath) {
          await TranspileTypescript([interceptorPath.replace('.', '')], 'interceptor');
          const modulePath = join(process.cwd(), 'interceptor', interceptorPath.replace('ts', 'js'));
          return {
            handler: getFirstItem(require(modulePath)),
            resolverHook: getSecondItem(require(modulePath)),
          };
        }
        return {
          handler: null,
        };
      },
    },
  ],
})
export class AppModule {}
