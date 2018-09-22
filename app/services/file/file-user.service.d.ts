import { BootstrapLogger } from '@rxdi/core';
import { FileService } from './file.service';
import { ParcelBundlerService } from '../parcel-bundler/parcel-bundler.service';
import { FileIpfsService } from '../ipfs-file/ipfs-file.service';
import { IPFSFile } from '@gapi/ipfs';
import { TypescriptDefinitionGeneratorService } from '../dts-generator/dts-generator.service';
export declare class FileUserService {
    private fileService;
    private parcelBundler;
    private ipfsFile;
    private typingsGenerator;
    private logger;
    defaultBuildDirecctory: string;
    dag_name: string;
    constructor(fileService: FileService, parcelBundler: ParcelBundlerService, ipfsFile: FileIpfsService, typingsGenerator: TypescriptDefinitionGeneratorService, logger: BootstrapLogger);
    getTsConfig(filename: string): string;
    completeBuildAndAddToIpfs(folder: string, file: string, namespace: string, message: any): import("rxjs/internal/Observable").Observable<{}>;
    completeBuildAndAddToIpfs2(namespace?: string): import("rxjs/internal/Observable").Observable<IPFSFile[]>;
    writeFile(file: string, fileName: string, namespace: string): Promise<{}>;
    writeDag(path: string, file: string): Promise<{}>;
}
