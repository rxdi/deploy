
import { Module } from '@rxdi/core';
import { IpfsModule } from '@gapi/ipfs';
import { IpfsDaemonModule } from '@gapi/ipfs-daemon';
import { FileIpfsService } from './services/ipfs-file/ipfs-file.service';
import { FileService } from './services/file/file.service';
import { ParcelBundlerService } from './services/parcel-bundler/parcel-bundler.service';
import { FileUserService } from './services/file/file-user.service';
import { TypescriptDefinitionGeneratorService } from './services/dts-generator/dts-generator.service';

@Module({
    imports: [
        IpfsDaemonModule.forRoot({ type: 'js' }),
        IpfsModule.forRoot({
            init: false,
            start: true,
            logging: true
        }),
    ],
    services: [
        FileIpfsService,
        FileService,
        ParcelBundlerService,
        FileUserService,
        TypescriptDefinitionGeneratorService
    ]
})
export class AppModule { }