import { __DEPLOYER_OUTPUT_CONFIG_NAME, DagModel } from '../../../env.injection.tokens';
import { BootstrapLogger, PluginInterface } from '@rxdi/core';
import { FileUserService } from '../../services/file/file-user.service';
import { IPFSFile } from '@gapi/ipfs';
import { ParcelBundlerService } from '../../services/parcel-bundler/parcel-bundler.service';
import { FileIpfsService } from '../../services/ipfs-file/ipfs-file.service';
import { FileService as CoreFileService } from '../../services/file/file.service';
import { TypescriptDefinitionGeneratorService } from '../../services/dts-generator/dts-generator.service';
import { TsConfigGenratorService } from '../../services/tsconfig-generator/tsconfig-generator.service';
import { TableService } from '../../services/table-service/table-service';
import { BuildHistoryService } from '../../services/build-history/build-history.service';
import { PreviousService } from '../../services/previous/previous.service';
import { ErrorReasonService } from '../../services/error-reason/error-reason.service';
import { StatusService } from '../../status/status.service';
import { PackageJsonService } from '../../services/package-json/package-json.service';
import { NamespaceService } from '../../server/namespace/services/namespace.service';
import { FileService } from '../../server/file/services/file.service';
export declare class CompilePlugin implements PluginInterface {
    private parcelBundler;
    private logger;
    private ipfsFile;
    private fileService;
    private fileUserService;
    private typingsGenerator;
    private tsConfigGenerator;
    private tableService;
    private buildHistoryService;
    private previousService;
    private namespaceService;
    private errorReasonService;
    private statusService;
    private packageJsonService;
    private internalFileService;
    private fileName;
    private folder;
    private resolutionTime;
    private outputConfigName;
    private namespace;
    private commitMessage;
    private extension;
    fileNotDeployed: string;
    initIpfsModule: {
        size: number;
        hash: string;
        path: string;
        content: string;
    }[];
    constructor(parcelBundler: ParcelBundlerService, logger: BootstrapLogger, ipfsFile: FileIpfsService, fileService: CoreFileService, fileUserService: FileUserService, typingsGenerator: TypescriptDefinitionGeneratorService, tsConfigGenerator: TsConfigGenratorService, tableService: TableService, buildHistoryService: BuildHistoryService, previousService: PreviousService, namespaceService: NamespaceService, errorReasonService: ErrorReasonService, statusService: StatusService, packageJsonService: PackageJsonService, internalFileService: FileService);
    register(): Promise<unknown>;
    isJavascriptCompilation(): boolean;
    compile(): Promise<import("rxjs").Subscription>;
    parcelBuild(path: string, outDir: any, fileName: string): Promise<unknown>;
    createCommitMessage(message?: string): Promise<IPFSFile[]>;
    completeBuildAndAddToIpfs(folder: string, file: string, message: any, namespace: string, outputConfigName: __DEPLOYER_OUTPUT_CONFIG_NAME, buildFolder?: string): import("rxjs").Observable<{}>;
    fileNotAddedToIpfs(file: IPFSFile[]): void;
    integrityCheck(dag: DagModel, file: IPFSFile[], typings: IPFSFile[]): void;
    showError(oldHash: any, newHash: string): Promise<unknown>;
    writeOtherFile(file: any): import("rxjs").Observable<IPFSFile[]>;
    logSuccess(res: any): void;
    completeBuildAndAddToIpfs2(namespace?: string): import("rxjs").Observable<IPFSFile[]>;
    pushTransaction(folder: string, file: string, message: any, namespace: string, outputConfigName: __DEPLOYER_OUTPUT_CONFIG_NAME, buildFolder?: string): import("rxjs").Observable<{}>;
}
