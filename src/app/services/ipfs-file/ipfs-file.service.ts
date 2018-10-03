import { Service, Inject, BootstrapLogger } from '@rxdi/core';
import { IPFSFile, FilesAPI } from '@gapi/ipfs';
import { Readable } from 'stream';
import { IpfsDaemonInfoService } from '@gapi/ipfs-daemon/ipfs-daemon-node-info';
import { DaemonNodeInfo, IPFS_DAEMON } from '@gapi/ipfs-daemon';
import { Observable, combineLatest } from 'rxjs';
import { get as http, IncomingMessage } from 'http';
import { get as https } from 'https';
import { switchMap } from 'rxjs/operators';

@Service()
export class FileIpfsService {

    nodeInfo: DaemonNodeInfo = this.ipfsDaemonNodeInfo.info;
    providers = {
        infura: 'https://ipfs.infura.io/ipfs/',
        cloudflare: 'https://cloudflare-ipfs.com/ipfs/',
        ipfsOriginal: 'https://ipfs.io/ipfs/',
        thisNode: `http://${this.ipfsDaemonNodeInfo.info.gatewayHost}:${this.ipfsDaemonNodeInfo.info.gatewayPort}/ipfs/`
    };
    constructor(
        @Inject(IPFS_DAEMON) private ipfsDaemon: { api: FilesAPI },
        private ipfsDaemonNodeInfo: IpfsDaemonInfoService,
        private logger: BootstrapLogger
    ) {}

    async addFile(file: string) {
        const content = new Readable();
        content.push(file);
        content.push(null);
        const ipfsFile = await this.ipfsDaemon.api.add([{ content }]);
        try {
            this.ping(ipfsFile[0].hash)
            .subscribe()
        } catch (e) {

        }

        // this.logger.log(`\nLocal: http://${this.nodeInfo.gatewayHost}:${this.nodeInfo.gatewayPort}/ipfs/${ipfsFile[0].hash}`);
        // this.logger.log(`\nInfura: ${providers.infura}${ipfsFile[0].hash}`);
        this.logger.log(`\Cloudflare: ${this.providers.cloudflare}${ipfsFile[0].hash}`);
        // this.logger.log(`\nIpfs: ${providers.ipfsOriginal}${ipfsFile[0].hash}`);

        return ipfsFile;
    }
    ping(hash: string) {
        return this.httpObservable(`${this.providers.thisNode}${hash}`)
            .pipe(
                switchMap(() => combineLatest(
                    this.httpObservable(`${this.providers.infura}${hash}`),
                    this.httpObservable(`${this.providers.cloudflare}${hash}`),
                    this.httpObservable(`${this.providers.ipfsOriginal}${hash}`)
                ))
            );
    }

    httpObservable(link: string): Observable<IncomingMessage> {
        return Observable.create(o => {
            if (link.includes('https')) {
                https(link, (r) => o.next(r));
            } else {
                http(link, (r) => o.next(r));
            }
        });
    }
    async wait(ipfsFile: IPFSFile[]) {
        return await new Promise((resolve, reject) => this.ping(ipfsFile[0].hash)
            .subscribe(
                stream => resolve(stream), e => reject(e)
            ))
    }

    async addPackage(p) {
        return await this.addFile(JSON.stringify(p, null, 4));
    }

    async catIpfsFile(hash: string) {
        return await this.ipfsDaemon.api.cat(hash);
    }

    async getIpfsFile(hash: string) {
        return await this.ipfsDaemon.api.get(hash);
    }

    async addRawFile(content: Buffer) {
        const ipfsFile = await this.ipfsDaemon.api.add([{ content }]);
        this.ping(ipfsFile[0].hash).subscribe();
        return ipfsFile;
    }

}

