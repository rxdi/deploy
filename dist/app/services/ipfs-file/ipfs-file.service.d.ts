/// <reference types="node" />
import { BootstrapLogger } from '@rxdi/core';
import { IPFSFile, FilesAPI } from '@gapi/ipfs';
import { IpfsDaemonInfoService } from '@gapi/ipfs-daemon/ipfs-daemon-node-info';
import { DaemonNodeInfo } from '@gapi/ipfs-daemon';
import { Observable } from 'rxjs';
import { IncomingMessage } from 'http';
export declare class FileIpfsService {
    private ipfsDaemon;
    private ipfsDaemonNodeInfo;
    private logger;
    nodeInfo: DaemonNodeInfo;
    providers: {
        infura: string;
        cloudflare: string;
        ipfsOriginal: string;
        thisNode: string;
    };
    constructor(ipfsDaemon: {
        api: FilesAPI;
    }, ipfsDaemonNodeInfo: IpfsDaemonInfoService, logger: BootstrapLogger);
    addFile(file: string): Promise<IPFSFile[]>;
    ping(hash: string): Observable<[IncomingMessage, IncomingMessage, IncomingMessage]>;
    httpObservable(link: string): Observable<IncomingMessage>;
    wait(ipfsFile: IPFSFile[]): Promise<unknown>;
    addPackage(p: any): Promise<IPFSFile[]>;
    catIpfsFile(hash: string): Promise<import("@gapi/ipfs").FileContent>;
    getIpfsFile(hash: string): Promise<IPFSFile>;
    addRawFile(content: Buffer): Promise<IPFSFile[]>;
}
