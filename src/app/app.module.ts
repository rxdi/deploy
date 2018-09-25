
import { Module } from '@rxdi/core';
import { IpfsModule } from '@gapi/ipfs';
import { IpfsDaemonModule } from '@gapi/ipfs-daemon';
import { FileIpfsService } from './services/ipfs-file/ipfs-file.service';
import { FileService } from './services/file/file.service';
import { ParcelBundlerService } from './services/parcel-bundler/parcel-bundler.service';
import { FileUserService } from './services/file/file-user.service';
import { TypescriptDefinitionGeneratorService } from './services/dts-generator/dts-generator.service';
import { nextOrDefault, includes } from './services/arguments/arguments.service';
import { TsConfigGenratorService } from './services/tsconfig-generator/tsconfig-generator.service';
import { TableService } from './services/table-service/table-service';
import { StatusModule } from './status/status.module';
import { BuildHistoryService } from './services/build-history/build-history.service';
import { ErrorReasonService } from './services/error-reason/error-reason.service';
import { CompilePlugin } from './plugins/compile/compile.plugin';
import { TimeService } from './services/time/time.service';
import { HtmlTemplateBuilder } from './services';
import { ServerModule } from './server/server.module';

const _IMPORTS = [
    IpfsDaemonModule.forRoot({
        type: nextOrDefault('--default-ipfs-node', 'js')
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
        HtmlTemplateBuilder
    ],
    plugins: [CompilePlugin]
})
export class AppModule { }