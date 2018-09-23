
import { Module } from '@rxdi/core';
import { IpfsModule } from '@gapi/ipfs';
import { IpfsDaemonModule } from '@gapi/ipfs-daemon';
import { FileIpfsService } from './services/ipfs-file/ipfs-file.service';
import { FileService } from './services/file/file.service';
import { ParcelBundlerService } from './services/parcel-bundler/parcel-bundler.service';
import { FileUserService } from './services/file/file-user.service';
import { TypescriptDefinitionGeneratorService } from './services/dts-generator/dts-generator.service';
import { nextOrDefault } from './services/arguments/arguments.service';
import { CompileService } from './services/compile/compile.service';
import { TsConfigGenratorService } from './services/tsconfig-generator/tsconfig-generator.service';

@Module({
    imports: [
        IpfsDaemonModule.forRoot({
            type: nextOrDefault('--default-ipfs-node', 'js')
        }),
        IpfsModule.forRoot()
    ],
    services: [
        FileIpfsService,
        FileService,
        ParcelBundlerService,
        FileUserService,
        TypescriptDefinitionGeneratorService,
        TsConfigGenratorService
    ],
    afterPlugins: [CompileService]
})
export class AppModule { }