import { Service, Inject, BootstrapLogger } from '@rxdi/core';
import { IPFS } from '@gapi/ipfs';
import { Readable } from 'stream';
import { IpfsDaemonInfoService } from '@gapi/ipfs-daemon/ipfs-daemon-node-info';
import { PingService, DaemonNodeInfo } from '@gapi/ipfs-daemon';

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
        @Inject(IPFS) private ipfs: IPFS,
        private ipfsDaemonNodeInfo: IpfsDaemonInfoService,
        private pingService: PingService,
        private logger: BootstrapLogger
    ) { }

    async addFile(file: string) {
        const content = new Readable();
        content.push(file);
        content.push(null);
        const ipfsFile = await this.ipfs.files.add([{ content }]);
        this.pingService.ping(ipfsFile[0].hash).subscribe();
        // this.logger.log(`\nLocal: http://${this.nodeInfo.gatewayHost}:${this.nodeInfo.gatewayPort}/ipfs/${ipfsFile[0].hash}`);
        // this.logger.log(`\nInfura: ${providers.infura}${ipfsFile[0].hash}`);
        this.logger.log(`\Cloudflare: ${this.providers.cloudflare}${ipfsFile[0].hash}`);
        // this.logger.log(`\nIpfs: ${providers.ipfsOriginal}${ipfsFile[0].hash}`);

        return ipfsFile;
    }

    async addPackage(p) {
        return await this.addFile(JSON.stringify(p, null, 4));
    }

    async catIpfsFile(hash: string) {
        return await this.ipfs.files.cat(hash);
    }

    async getIpfsFile(hash: string) {
        return await this.ipfs.files.get(hash);
    }

    async addRawFile(content: Buffer) {
        const ipfsFile = await this.ipfs.files.add([{ content }]);
        this.pingService.ping(ipfsFile[0].hash).subscribe();
        return ipfsFile;
    }

}

