
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
            logging: true,
            config: {
                Addresses: {
                    API: '/ip4/127.0.0.1/tcp/5002',
                    Announce: [],
                    Gateway: '/ip4/127.0.0.1/tcp/8080',
                    NoAnnounce: [],
                    Swarm: [
                        '/ip4/0.0.0.0/tcp/4002',
                        '/ip6/::/tcp/4002'
                    ]
                },
            }
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
export class CoreModule { }