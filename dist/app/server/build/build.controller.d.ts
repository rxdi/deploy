import { PubSubService } from "@gapi/core";
import { CompileService } from "../services/compile.service";
import { IHistoryListType } from "../../core/api-introspection";
import { BuildHistoryService, FileService, TsConfigGenratorService, LoggerService } from "../../services";
export declare class BuildController {
    private compileService;
    private buildHistoryService;
    private pubsub;
    private fileService;
    private tsGenerator;
    private loggerService;
    constructor(compileService: CompileService, buildHistoryService: BuildHistoryService, pubsub: PubSubService, fileService: FileService, tsGenerator: TsConfigGenratorService, loggerService: LoggerService);
    triggerBuild(root: any, { folder, file, message, namespace, buildFolder }: {
        folder: any;
        file: any;
        message: any;
        namespace: any;
        buildFolder: any;
    }): Promise<unknown>;
    getBuildHistory(root: any, { skip, limit, where }: {
        skip: any;
        limit: any;
        where: any;
    }): Promise<IHistoryListType>;
    buildStatus(payload: any): {
        payload: any;
    };
    processStdOut(payload: any): {
        payload: any;
    };
}
