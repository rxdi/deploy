import { BootstrapLogger } from '@rxdi/core';
import { FileUserService } from '../file/file-user.service';
import { IPFSFile } from '@gapi/ipfs';
import { ParcelBundlerService } from '../parcel-bundler/parcel-bundler.service';
import { FileIpfsService } from '../ipfs-file/ipfs-file.service';
import { FileService } from '../file/file.service';
import { TypescriptDefinitionGeneratorService } from '../dts-generator/dts-generator.service';
import { TsConfigGenratorService } from '../tsconfig-generator/tsconfig-generator.service';
export declare class CompileService {
    private parcelBundler;
    private logger;
    private ipfsFile;
    private fileService;
    private fileUserService;
    private typingsGenerator;
    private tsConfigGenerator;
    private args;
    private fileName;
    private folder;
    private resolutionTime;
    private outputConfigName;
    private namespace;
    constructor(parcelBundler: ParcelBundlerService, logger: BootstrapLogger, ipfsFile: FileIpfsService, fileService: FileService, fileUserService: FileUserService, typingsGenerator: TypescriptDefinitionGeneratorService, tsConfigGenerator: TsConfigGenratorService);
    register(): Promise<void>;
    completeBuildAndAddToIpfs(folder: string, file: string, message: any): import("rxjs/internal/Observable").Observable<{}>;
    compile(): Promise<import("rxjs/internal/Subscription").Subscription>;
    logSuccess(res: any): void;
    completeBuildAndAddToIpfs2(namespace?: string): import("rxjs/internal/Observable").Observable<IPFSFile[]>;
}
