/// <reference types="node" />
import { BootstrapLogger } from '@rxdi/core';
import { IPFS } from '@gapi/ipfs';
import { IpfsDaemonInfoService } from '@gapi/ipfs-daemon/ipfs-daemon-node-info';
import { PingService, DaemonNodeInfo } from '@gapi/ipfs-daemon';
export declare class FileIpfsService {
    private ipfs;
    private ipfsDaemonNodeInfo;
    private pingService;
    private logger;
    nodeInfo: DaemonNodeInfo;
    providers: {
        infura: string;
        cloudflare: string;
        ipfsOriginal: string;
        thisNode: string;
    };
    constructor(ipfs: IPFS, ipfsDaemonNodeInfo: IpfsDaemonInfoService, pingService: PingService, logger: BootstrapLogger);
    addFile(file: string): Promise<import("@gapi/ipfs/ipfs-injection").IPFSFile[]>;
    addPackage(p: any): Promise<import("@gapi/ipfs/ipfs-injection").IPFSFile[]>;
    catIpfsFile(hash: string): Promise<import("@gapi/ipfs/ipfs-injection").FileContent>;
    getIpfsFile(hash: string): Promise<import("@gapi/ipfs/ipfs-injection").IPFSFile>;
    addRawFile(content: Buffer): Promise<import("@gapi/ipfs/ipfs-injection").IPFSFile[]>;
}
